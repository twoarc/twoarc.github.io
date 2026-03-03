import React, { useEffect, useState } from 'react';

const InvitePage = () => {
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        // 1. URL parametrelerinden davet kodunu al
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get('code');
        if (codeParam) {
            setCode(codeParam);
        }
    }, []);

    const handleJoinClick = () => {
        if (!code) {
            alert("URL'de davet kodu bulunamadı.");
            return;
        }

        // 2. İşletim Sistemi (OS) Tespiti
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
        const isAndroid = /android/i.test(userAgent);

        // 3. Yönlendirme Linkleri
        const appSchemeUrl = `worldcup://invite?code=${code}`;
        const fallbackUrlIOS = "https://apps.apple.com/app/id6503610991"; // Geliştiricinin iOS App Store ID'si
        const fallbackUrlAndroid = "https://play.google.com/store/apps/details?id=com.twoarc.worldcup";

        // 4. Uygulamayı açmayı dene (Deep Link)
        window.location.href = appSchemeUrl;

        // 5. Uygulama açılmazsa ilgili mağazaya yönlendir
        setTimeout(() => {
            if (isIOS) {
                window.location.href = fallbackUrlIOS;
            } else if (isAndroid) {
                window.location.href = fallbackUrlAndroid;
            } else {
                // Masaüstü veya bilinmeyen OS için varsayılan fallback
                window.location.href = fallbackUrlAndroid;
            }
        }, 2500); // 2.5 saniye bekle
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>🏆</div>
                <h1 style={styles.title}>You've been invited!</h1>
                <p style={styles.subtitle}>
                    Someone invited you to join their private league on the WorldCup app. Click the button below to join the action.
                </p>

                <div style={styles.codeBox}>
                    {code || '------'}
                </div>

                <button
                    onClick={handleJoinClick}
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    JOIN THE LEAGUE
                </button>
            </div>
        </div>
    );
};

// Sayfa İçi Stiller
const styles = {
    container: {
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center' as const,
    },
    card: {
        backgroundColor: '#202020',
        padding: '40px 30px',
        borderRadius: '20px',
        maxWidth: '90%',
        width: '400px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    },
    icon: {
        fontSize: '60px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 800,
        margin: '0 0 10px 0',
    },
    subtitle: {
        color: '#8E8E93',
        fontSize: '15px',
        margin: '0 0 30px 0',
        lineHeight: 1.5,
    },
    codeBox: {
        backgroundColor: '#111111',
        padding: '15px',
        borderRadius: '12px',
        fontSize: '28px',
        fontWeight: 900,
        letterSpacing: '8px',
        color: '#07ff39',
        marginBottom: '30px',
    },
    button: {
        backgroundColor: '#07ff39',
        color: '#000000',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 800,
        padding: '18px 24px',
        borderRadius: '12px',
        display: 'block',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        boxSizing: 'border-box' as const,
    }
};

export default InvitePage;
