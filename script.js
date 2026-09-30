document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const resultArea = document.getElementById('result-area');
    const resultMessage = document.getElementById('result-message');
    const btnRed = document.getElementById('btn-red');
    const btnBlue = document.getElementById('btn-blue');
    const btnReset = document.getElementById('btn-reset');

    const outcomes = ['Has ganado', 'Has perdido'];

    function handleChoice() {
        // Randomly pick 0 or 1
        const randomIndex = Math.floor(Math.random() * outcomes.length);
        const result = outcomes[randomIndex];
        
        // Update UI
        resultMessage.textContent = result;
        
        // Add styling based on result
        if (result === 'Has ganado') {
            resultMessage.className = 'result-text win';
            createConfetti();
        } else {
            resultMessage.className = 'result-text lose';
        }
        
        // Switch view
        gameArea.classList.add('hidden');
        resultArea.classList.remove('hidden');
    }

    function resetGame() {
        // Clean up confetti if any
        document.querySelectorAll('.confetti').forEach(el => el.remove());
        
        // Switch view
        resultArea.classList.add('hidden');
        gameArea.classList.remove('hidden');
    }

    btnRed.addEventListener('click', handleChoice);
    btnBlue.addEventListener('click', handleChoice);
    btnReset.addEventListener('click', resetGame);

    // Simple confetti effect for winning
    function createConfetti() {
        const colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];
        for (let i = 0; i < 70; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -20 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            // Random animation duration and delay
            const duration = Math.random() * 3 + 2; // 2s to 5s
            const delay = Math.random() * 1.5;
            
            confetti.animate([
                { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random()*300 - 150}px, 100vh, 0) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(.37,0,.63,1)',
                fill: 'forwards'
            });
            
            document.body.appendChild(confetti);
            
            // Clean up DOM after animation completes
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, (duration + delay) * 1000);
        }
    }
});
