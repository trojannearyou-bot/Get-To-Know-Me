function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Copy-on-click for email link: left mouse click copies email to clipboard and shows feedback
document.addEventListener('DOMContentLoaded', () => {
  const emailLink = document.getElementById('email-link');
  const feedback = document.getElementById('copy-feedback');

  if (!emailLink) return;

  const showFeedback = (msg) => {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.classList.add('visible');
    setTimeout(() => {
      feedback.classList.remove('visible');
      feedback.textContent = '';
    }, 1800);
  };

  const copyEmail = async () => {
    const email = emailLink.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showFeedback('Copied!');
    } catch (err) {
      console.error('Copy failed:', err);
      showFeedback('Copy failed');
    }
  };

  emailLink.addEventListener('click', (e) => {
    // Only handle left mouse clicks and no modifier keys (so users can still open mail client with Ctrl/Cmd)
    if (e.button !== 0) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    copyEmail();
  });

  // Keyboard support: Enter or Space copies as well
  emailLink.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyEmail();
    }
  });

  // Give a visual cue programmatically as well
  emailLink.style.cursor = 'pointer';
});

