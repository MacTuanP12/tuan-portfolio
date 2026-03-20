import React from 'react';

const TronBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020617]">
            {/* Horizon Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#0ea5e9_0%,_transparent_50%)] opacity-20"></div>

            {/* 3D Grid */}
            <div className="absolute w-[200%] h-[200%] -left-[50%] -top-[50%] perspective-1000">
                <div className="w-full h-full animate-grid-flow"
                     style={{
                         backgroundImage: `
                            linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)
                         `,
                         backgroundSize: '80px 80px',
                         transform: 'rotateX(60deg)',
                         maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)'
                     }}
                ></div>
            </div>

            <style>{`
                @keyframes grid-flow {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 80px; }
                }
                .animate-grid-flow {
                    animation: grid-flow 2s linear infinite;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </div>
    );
};

export default TronBackground;

