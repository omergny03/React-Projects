import React from 'react'

function About() {
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "'Arial', sans-serif",
      color: "#333",
      lineHeight: "1.6",
    },
    heading: {
      textAlign: "center",
      color: "#007BFF",
    },
    text: {
      marginBottom: "15px",
    },
  };
  return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Hakkında</h1>
        <p style={styles.text}>
          Bu hava durumu web sitesi, anlık hava durumu bilgilerini sunmak için
          tasarlanmıştır. Kullanıcılar, dünyanın herhangi bir yerindeki hava
          sıcaklığını, nem oranını ve diğer hava durumu detaylarını öğrenebilir.
        </p>
        <p style={styles.text}>
          Web sitesi, modern teknolojiler kullanılarak geliştirilmiştir:
          <ul>
            <li>React: Hızlı ve dinamik kullanıcı arayüzleri oluşturmak için.</li>
            <li>OpenWeather API: Güncel hava durumu verilerini sağlamak için.</li>
            <li>CSS: Görsel tasarımı geliştirmek için.</li>
          </ul>
        </p>
        <p style={styles.text}>
          Projenin amacı, kullanıcı dostu bir deneyim sağlayarak doğru ve hızlı
          bilgi sunmaktır. Geliştirme sürecinde sürekli olarak güncellemeler
          yapılmaktadır.
        </p>
      </div>
    );
  
}

export default About