import React from 'react';

const CSSStyles = () => (
    <style jsx>{`
        .animate-fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-scale-in {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-scale-in.visible {
            opacity: 1;
            transform: scale(1);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #1C2E82, #ED0000);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hover-lift {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hover-lift:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .floating-shapes::before {
            content: '';
            position: absolute;
            top: 10%;
            right: 10%;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #1C2E82, #2d4bc7);
            border-radius: 50%;
            opacity: 0.1;
            animation: float 6s ease-in-out infinite;
        }
        
        .floating-shapes::after {
            content: '';
            position: absolute;
            bottom: 20%;
            left: 5%;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ED0000, #ff4444);
            border-radius: 50%;
            opacity: 0.1;
            animation: float 4s ease-in-out infinite reverse;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .sparkle {
            position: relative;
            overflow: hidden;
        }
        
        .sparkle::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent
            );
            transform: rotate(45deg) translateY(-100%);
            transition: transform 0.6s;
        }
        
        .sparkle:hover::before {
            transform: rotate(45deg) translateY(100%);
        }
    `}</style>
);

export default CSSStyles;