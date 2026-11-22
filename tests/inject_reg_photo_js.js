const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

const photoJsCode = `
// ─── PASSPORT PHOTO UPLOAD & LIVE WEBCAM ENGINE ───
let regWebcamStream = null;

function handlePassportPhotoSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert('Photo size exceeds 5MB limit: ' + file.name);
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    applyPassportPhoto(e.target.result, file.name, file.size);
  };
  reader.readAsDataURL(file);
}

function applyPassportPhoto(dataUrl, fileName, fileSize) {
  window.__PASSPORT_PHOTO_DATA__ = dataUrl;
  const img = document.getElementById('passportPhotoPreviewImg');
  const ph = document.getElementById('passportPhotoPlaceholder');
  const badge = document.getElementById('photoStatusBadge');
  const removeBtn = document.getElementById('btnRemovePhoto');

  if (img) {
    img.src = dataUrl;
    img.style.display = 'block';
  }
  if (ph) ph.style.display = 'none';
  if (badge) {
    badge.textContent = \`✓ Attached (\${Math.round((fileSize || 200000) / 1024)} KB)\`;
    badge.style.background = '#ECFDF5';
    badge.style.color = '#059669';
    badge.style.borderColor = '#A7F3D0';
  }
  if (removeBtn) removeBtn.style.display = 'inline-flex';

  // Synchronize with Section 06 Document Checklist (#up-photo)
  const listEl = document.getElementById('list-up-photo');
  if (listEl) {
    listEl.innerHTML = \`<span style="color:#10b981;">✓ \${fileName || 'passport_photo.jpg'}</span> (\${formatBytes(fileSize || 200000)})\`;
  }
  uploadedAttachments = uploadedAttachments.filter(a => a.inputId !== 'up-photo');
  uploadedAttachments.push({
    inputId: 'up-photo',
    docType: 'PHOTO',
    fileName: fileName || 'passport_photo.jpg',
    fileSize: fileSize || 200000,
    mimeType: 'image/jpeg',
    dataUrl: dataUrl
  });
  updateUploadSummary();
}

function removePassportPhoto() {
  window.__PASSPORT_PHOTO_DATA__ = null;
  const img = document.getElementById('passportPhotoPreviewImg');
  const ph = document.getElementById('passportPhotoPlaceholder');
  const badge = document.getElementById('photoStatusBadge');
  const removeBtn = document.getElementById('btnRemovePhoto');
  const fileInput = document.getElementById('passportPhotoInput');

  if (img) {
    img.src = '';
    img.style.display = 'none';
  }
  if (ph) ph.style.display = 'flex';
  if (badge) {
    badge.textContent = 'Photo Required *';
    badge.style.background = '#FEF3C7';
    badge.style.color = '#D97706';
    badge.style.borderColor = '#FCD34D';
  }
  if (removeBtn) removeBtn.style.display = 'none';
  if (fileInput) fileInput.value = '';

  const upPhoto = document.getElementById('up-photo');
  if (upPhoto) upPhoto.value = '';
  const listEl = document.getElementById('list-up-photo');
  if (listEl) listEl.textContent = 'No file selected';

  uploadedAttachments = uploadedAttachments.filter(a => a.inputId !== 'up-photo');
  updateUploadSummary();
}

function openCameraCaptureModal() {
  const modal = document.getElementById('regCameraModal');
  if (!modal) return;
  modal.classList.add('active');

  const video = document.getElementById('regCameraVideo');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } })
      .then(stream => {
        regWebcamStream = stream;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.warn('Camera error:', err);
        alert('Live camera access is not available or blocked in this browser. Please use "Choose Photo / फोटो चुनें" to select a photo from your device.');
        closeCameraCaptureModal();
      });
  } else {
    alert('Webcam capture is not supported in this browser. Please upload an image file.');
    closeCameraCaptureModal();
  }
}

function snapCameraPhoto() {
  const video = document.getElementById('regCameraVideo');
  const canvas = document.getElementById('regCameraCanvas');
  if (!video || !canvas) return;

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

  applyPassportPhoto(dataUrl, 'webcam_portrait.jpg', 220000);
  closeCameraCaptureModal();
}

function closeCameraCaptureModal() {
  const modal = document.getElementById('regCameraModal');
  if (modal) modal.classList.remove('active');
  if (regWebcamStream) {
    regWebcamStream.getTracks().forEach(t => t.stop());
    regWebcamStream = null;
  }
}
`;

if (!html.includes('function applyPassportPhoto')) {
  html = html.replace('function handleFileSelect', photoJsCode + '\nfunction handleFileSelect');
  console.log('✅ Successfully injected photoJsCode with function applyPassportPhoto');
}

fs.writeFileSync('BALSONS HR MANAGER/frontend/register.html', html, 'utf8');
fs.writeFileSync('BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/register.html', html, 'utf8');
console.log('Done!');
