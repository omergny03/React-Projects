#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>
#include <windows.h>

#pragma comment(lib, "ws2_32.lib")

#define PORT 8080
#define MAX_CLIENTS 10
#define TOTAL_TABLES 30

// Masa yapýsýný tanýmlýyoruz
typedef struct {
    int status; // 0 boş, 1 dolu
} Masa;

Masa masalar[TOTAL_TABLES]; // 30 adet masayý temsil eden array
CRITICAL_SECTION lock; // Thread güvenliði için Critical Section

DWORD WINAPI client_handler(void *socket_desc) {
    SOCKET sock = *(SOCKET *)socket_desc;
    free(socket_desc);
    char buffer[1024];
    int read_size;

    while ((read_size = recv(sock, buffer, sizeof(buffer), 0)) > 0) {
        buffer[read_size] = '\0';
        char response[1024];

        if (strncmp(buffer, "CHECK", 5) == 0) {
            // Masaların durumunu kontrol et ve gönder
            EnterCriticalSection(&lock);
            snprintf(response, sizeof(response), "Tables: ");
            for (int i = 0; i < TOTAL_TABLES; i++) {
                char table_info[4];
                snprintf(table_info, sizeof(table_info), "%d ", masalar[i].status);
                strncat(response, table_info, sizeof(response) - strlen(response) - 1);
            }
            LeaveCriticalSection(&lock);
        } else if (strncmp(buffer, "RESERVE", 7) == 0) {
            // Masa rezerve et
            int table_number = atoi(&buffer[8]);
            if (table_number < 1 || table_number > TOTAL_TABLES) {
                snprintf(response, sizeof(response), "Invalid");
            } else {
                EnterCriticalSection(&lock);
                if (masalar[table_number - 1].status == 0) {
                    masalar[table_number - 1].status = 1;
                    snprintf(response, sizeof(response), "True"); //"Table %d reserved.\n"
                } else {
                    snprintf(response, sizeof(response), "False"); //"Table %d is already reserved.\n"
                }
                LeaveCriticalSection(&lock);
            }
        } else if (strncmp(buffer, "LEAVE", 5) == 0) {
            // Masa rezerve et
            int table_number = atoi(&buffer[6]);
            if (table_number < 1 || table_number > TOTAL_TABLES) {
                snprintf(response, sizeof(response), "Invalid");
            } else {
                EnterCriticalSection(&lock);
                if (masalar[table_number - 1].status == 1) {
                    masalar[table_number - 1].status = 0;
                    snprintf(response, sizeof(response), "True"); //"Table %d reserved.\n"
                } else {
                    snprintf(response, sizeof(response), "False"); //"Table %d is already reserved.\n"
                }
                LeaveCriticalSection(&lock);
            }
        }

        else {
            snprintf(response, sizeof(response), "Unknown command. Use CHECK or RESERVE <table_number>.\n");
        }

        send(sock, response, strlen(response), 0);
    }

    closesocket(sock);
    return 0;
}

int main() {
    WSADATA wsa;
    SOCKET server_fd, new_socket, *new_sock;
    struct sockaddr_in server, client; //IP ve port numarasını tutar
    int client_len = sizeof(client);

    // Masalarý baþlangýçta boþ olarak ayarla
    for (int i = 0; i < TOTAL_TABLES; i++) {
        masalar[i].status = 0;
    }
    InitializeCriticalSection(&lock);

    // Winsock baþlat
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("Winsock initialization failed. Error Code: %d\n", WSAGetLastError());
        return 1;
    }

    // Soket oluþtur
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
        printf("Socket creation failed. Error Code: %d\n", WSAGetLastError());
        return 1;
    }

    // Soket adresi ve port ayarlarý
    server.sin_family = AF_INET; //adres ailesi
    server.sin_addr.s_addr = INADDR_ANY; //ip adresi
    server.sin_port = htons(PORT); //port numarası

    // Soketi baðla
    if (bind(server_fd, (struct sockaddr *)&server, sizeof(server)) == SOCKET_ERROR) {
        printf("Bind failed. Error Code: %d\n", WSAGetLastError());
        closesocket(server_fd);
        return 1;
    }

    // Dinleme baþlat
    if (listen(server_fd, MAX_CLIENTS) == SOCKET_ERROR) {
        printf("Listen failed. Error Code: %d\n", WSAGetLastError());
        closesocket(server_fd);
        return 1;
    }

    printf("Server is running on port %d\n", PORT);

    while ((new_socket = accept(server_fd, (struct sockaddr *)&client, &client_len)) != INVALID_SOCKET) {
        printf("New connection accepted\n");

        HANDLE thread;
        new_sock = malloc(sizeof(SOCKET));
        *new_sock = new_socket;

        thread = CreateThread(NULL, 0, client_handler, (void *)new_sock, 0, NULL);
        if (thread == NULL) {
            printf("Thread creation failed.\n");
            free(new_sock);
        } else {
            CloseHandle(thread);
        }
    }

    if (new_socket == INVALID_SOCKET) {
        printf("Accept failed. Error Code: %d\n", WSAGetLastError());
    }

    closesocket(server_fd);
    DeleteCriticalSection(&lock);
    WSACleanup();
    return 0;
}

//gcc -o server server.c -lws2_32
//server.exe
//C:\Users\omerg\OneDrive\Masaüstü\sayısal analiz\data_com
