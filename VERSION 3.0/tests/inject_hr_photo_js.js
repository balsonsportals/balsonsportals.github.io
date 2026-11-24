const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/index.html', 'utf8');

const additionalJs = `
    // ─── PHOTO UPLOAD & WEBCAM CAPTURE CONTROLS ───
    let hrWebcamStream = null;
    let hrWebcamTarget = 'onboard'; // 'onboard' or 'edit'

    function handleEditPhotoSelect(e) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('Photo size exceeds 5MB limit: ' + file.name);
          return;
        }
        const reader = new FileReader();
        reader.onload = function(evt) {
          const img = document.getElementById('editEmpPhotoImg');
          if (img) img.src = evt.target.result;
          const status = document.getElementById('editPhotoStatus');
          if (status) status.textContent = \`\${file.name} (\${Math.round(file.size/1024)} KB) • Photo Attached ✓\`;
          const badge = document.getElementById('editPhotoBadge');
          if (badge) {
            badge.textContent = 'UPDATED ✓';
            badge.className = 'status-pill status-success';
          }
        };
        reader.readAsDataURL(file);
      }
    }

    function triggerWebcamForOnboard() {
      hrWebcamTarget = 'onboard';
      openWebcamModal();
    }

    function triggerWebcamForEdit() {
      hrWebcamTarget = 'edit';
      openWebcamModal();
    }

    function openWebcamModal() {
      const modal = document.getElementById('modalWebcamCapture');
      if (!modal) return;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      const video = document.getElementById('hrWebcamVideo');
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } })
          .then(stream => {
            hrWebcamStream = stream;
            video.srcObject = stream;
            video.play();
          })
          .catch(err => {
            console.warn('[Webcam] Camera access error:', err);
            alert('Live camera access is unavailable or blocked in this browser. Please use the "Choose Photo..." button to upload an image file.');
            closeWebcamModal();
          });
      } else {
        alert('Webcam API is not supported in this browser. Please upload an image file.');
        closeWebcamModal();
      }
    }

    function captureWebcamPhoto() {
      const video = document.getElementById('hrWebcamVideo');
      const canvas = document.getElementById('hrWebcamCanvas');
      if (!video || !canvas) return;

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

      if (hrWebcamTarget === 'onboard') {
        const img = document.getElementById('onbPhotoImg');
        if (img) img.src = dataUrl;
        const status = document.getElementById('photoStatusText');
        if (status) status.textContent = 'Live camera photo captured (Webcam 0.92 JPEG) ✓';
        const badge = document.getElementById('badgePhoto');
        if (badge) {
          badge.textContent = 'ATTACHED ✓';
          badge.className = 'status-pill status-success';
        }
      } else if (hrWebcamTarget === 'edit') {
        const img = document.getElementById('editEmpPhotoImg');
        if (img) img.src = dataUrl;
        const status = document.getElementById('editPhotoStatus');
        if (status) status.textContent = 'Live camera photo captured ✓';
        const badge = document.getElementById('editPhotoBadge');
        if (badge) {
          badge.textContent = 'CAMERA CAPTURED ✓';
          badge.className = 'status-pill status-success';
        }
      }

      closeWebcamModal();
    }

    function closeWebcamModal() {
      const modal = document.getElementById('modalWebcamCapture');
      if (modal) modal.style.display = 'none';
      document.body.style.overflow = '';
      if (hrWebcamStream) {
        hrWebcamStream.getTracks().forEach(track => track.stop());
        hrWebcamStream = null;
      }
    }
`;

const targetRegex = /(<\/script>\s*<!--\s*WEBCAM)/i;
if (targetRegex.test(html)) {
  html = html.replace(targetRegex, additionalJs + '\n  </script>\n\n  <!-- WEBCAM');
  fs.writeFileSync('BALSONS HR MANAGER/frontend/index.html', html, 'utf8');
  fs.writeFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html', html, 'utf8');
  console.log('✅ Injected Webcam and Photo functions into index.html and Launcher mirror!');
} else {
  console.error('Target regex did not match!');
  process.exit(1);
}
