const fs = require('fs');

let html = fs.readFileSync('BALSONS HR MANAGER/frontend/register.html', 'utf8');

// 1. ADD PASSPORT PHOTO CARD TO SECTION 01
const s1Head = '<div class="section-head">01 &nbsp; PERSONAL INFORMATION</div>';
const s1Replacement = `<div class="section-head">01 &nbsp; PERSONAL INFORMATION</div>

    <!-- PASSPORT PHOTO UPLOAD & VERIFICATION CARD -->
    <div class="photo-upload-container" style="display: flex; gap: 20px; align-items: flex-start; margin-bottom: 20px; padding: 16px; background: #f8fafc; border: 1.5px dashed #0097B2; border-radius: 8px;">
      <!-- Passport Photo Frame (35mm x 45mm ratio) -->
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0;">
        <div id="passportPhotoFrame" style="width: 120px; height: 150px; border: 2px solid #0097B2; border-radius: 6px; background: #FFFFFF; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <img id="passportPhotoPreviewImg" src="" alt="Passport Photo Preview" style="display: none; width: 100%; height: 100%; object-fit: cover;">
          <div id="passportPhotoPlaceholder" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8px; color: #64748B;">
            <span style="font-size: 32px; line-height: 1;">📷</span>
            <span style="font-size: 10px; font-weight: 700; margin-top: 6px; color: #102D35;">PASSPORT PHOTO</span>
            <span style="font-size: 9px; color: #94A3B8;">35mm × 45mm</span>
          </div>
        </div>
        <span id="photoStatusBadge" class="status-badge" style="font-size: 10.5px; font-weight: 700; color: #D97706; background: #FEF3C7; padding: 2px 8px; border-radius: 4px; border: 1px solid #FCD34D;">Photo Required *</span>
      </div>

      <!-- Upload Action Controls & Statutory Specs -->
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
          <label style="font-size: 13px; font-weight: 800; color: #102D35; margin: 0;">
            EMPLOYEE PASSPORT PHOTO / पासपोर्ट फोटो / ପାସପୋର୍ଟ ଫଟୋ <span class="req">*</span>
          </label>
          <span style="font-size: 10px; font-weight: 700; color: #0097B2; background: #E0F2FE; padding: 2px 6px; border-radius: 3px;">STATUTORY IDENTIFICATION</span>
        </div>
        <p style="font-size: 11px; color: #475569; margin: 0 0 10px 0; line-height: 1.4;">
          Upload a recent passport-sized color photograph with white or light background. Required for factory gate pass entry badge (EMP-2026), official employee ID card, and biometric attendance profile.
        </p>

        <!-- Buttons -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 8px;">
          <label class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer; padding: 8px 14px; font-size: 12px; font-weight: 700; background: #0097B2; color: #fff; border-radius: 6px; border: none;">
            📁 Choose Photo / फोटो चुनें
            <input type="file" id="passportPhotoInput" accept="image/*" style="display: none;" onchange="handlePassportPhotoSelect(event)">
          </label>
          <button type="button" class="btn btn-secondary" onclick="openCameraCaptureModal()" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; font-size: 12px; font-weight: 700; background: #F1F5F9; color: #102D35; border: 1px solid #CBD5E1; border-radius: 6px; cursor: pointer;">
            📸 Use Live Camera / कैमरा से लें
          </button>
          <button type="button" id="btnRemovePhoto" class="btn btn-secondary" onclick="removePassportPhoto()" style="display: none; align-items: center; gap: 4px; padding: 8px 12px; font-size: 11.5px; font-weight: 700; color: #DC2626; border: 1px solid #FECACA; background: #FEF2F2; border-radius: 6px; cursor: pointer;">
            ✖ Remove
          </button>
        </div>

        <!-- Specs hint -->
        <div style="font-size: 10.5px; color: #64748B;">
          Supported formats: <strong>JPG, JPEG, PNG, WEBP</strong> • Max file size: <strong>5 MB</strong> • Recommended: <strong>Front-facing portrait</strong>
        </div>
      </div>
    </div>`;

if (!html.includes('id="passportPhotoFrame"')) {
  html = html.replace(s1Head, s1Replacement);
  console.log('✅ Added Passport Photo Card to Section 01 in register.html');
}

// 2. ADD CAMERA MODAL IN REGISTER.HTML
const cameraModalHtml = `
<!-- LIVE CAMERA CAPTURE MODAL -->
<div class="modal" id="regCameraModal">
  <div class="modal-card" style="max-width: 540px; padding: 22px;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--teal); padding-bottom: 10px; margin-bottom: 14px;">
      <h3 style="margin: 0; font-size: 16px; font-weight: 900; color: #102D35;">📸 Live Camera Passport Photo</h3>
      <button type="button" class="btn btn-secondary" onclick="closeCameraCaptureModal()" style="padding: 4px 8px; font-size: 12px;">✖</button>
    </div>
    
    <div style="position: relative; width: 100%; height: 320px; background: #000; border-radius: 6px; overflow: hidden; margin-bottom: 14px; display: flex; align-items: center; justify-content: center;">
      <video id="regCameraVideo" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
      <canvas id="regCameraCanvas" style="display: none;"></canvas>
      <div style="position: absolute; width: 175px; height: 225px; border: 2px dashed rgba(255,255,255,0.7); border-radius: 6px; pointer-events: none; box-shadow: 0 0 0 9999px rgba(0,0,0,0.35);"></div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 11px; color: #64748b;">Center face within frame</span>
      <div style="display: flex; gap: 8px;">
        <button type="button" class="btn btn-secondary" onclick="closeCameraCaptureModal()">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="snapCameraPhoto()" style="font-weight: 800;">📸 Snap Photo</button>
      </div>
    </div>
  </div>
</div>
`;

if (!html.includes('id="regCameraModal"')) {
  html = html.replace('</main>', cameraModalHtml + '\n</main>');
  console.log('✅ Injected regCameraModal into register.html');
}

// 3. ADD PHOTO ROW TO RECEIPT TABLE
const oldReceiptTable = `<table class="receipt-table">
      <tr>
        <td>Full Name</td>`;

const newReceiptTable = `<table class="receipt-table">
      <tr>
        <td>Employee Passport Photo</td>
        <td id="receiptPhotoCell">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img id="receiptPhotoImg" src="" alt="Passport Photo" style="width: 48px; height: 60px; object-fit: cover; border-radius: 4px; border: 1.5px solid var(--teal); display: none;">
            <span id="receiptPhotoBadge" style="font-size: 11px; font-weight: 700; color: #10b981;">✓ Stored in Central KYC Vault</span>
          </div>
        </td>
      </tr>
      <tr>
        <td>Full Name</td>`;

if (html.includes(oldReceiptTable)) {
  html = html.replace(oldReceiptTable, newReceiptTable);
  console.log('✅ Added photo row to receipt table in register.html');
}

// 4. ADD PHOTO JS FUNCTIONS & INTEGRATION
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

if (!html.includes('handlePassportPhotoSelect')) {
  // Inject right before handleFileSelect
  html = html.replace('function handleFileSelect', photoJsCode + '\nfunction handleFileSelect');
  console.log('✅ Injected photo functions into register.html');
}

// 5. UPDATE handleFileSelect to sync if user chose from #up-photo
const oldHandleFileSelectReader = `uploadedAttachments.push({
      inputId: input.id,
      docType: docType,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      dataUrl: e.target.result
    });`;

const newHandleFileSelectReader = `uploadedAttachments.push({
      inputId: input.id,
      docType: docType,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      dataUrl: e.target.result
    });

    if (input.id === 'up-photo') {
      applyPassportPhoto(e.target.result, file.name, file.size);
    }`;

if (html.includes(oldHandleFileSelectReader)) {
  html = html.replace(oldHandleFileSelectReader, newHandleFileSelectReader);
  console.log('✅ Updated handleFileSelect sync for #up-photo');
}

// 6. UPDATE handleRegistrationSubmit to bind photoData
const oldPayloadAttachments = `declarationAccepted: document.getElementById('declarationAccepted').checked,
    attachments: uploadedAttachments`;

const newPayloadAttachments = `declarationAccepted: document.getElementById('declarationAccepted').checked,
    photoData: window.__PASSPORT_PHOTO_DATA__ || (uploadedAttachments.find(a => a.docType === 'PHOTO') || {}).dataUrl || '',
    attachments: uploadedAttachments`;

if (html.includes(oldPayloadAttachments)) {
  html = html.replace(oldPayloadAttachments, newPayloadAttachments);
  console.log('✅ Updated payload to include photoData');
}

// 7. UPDATE completeSubmissionUI to save photo to BALSONS_EMPLOYEE_PHOTOS and render in receipt
const oldCompleteSubStart = `function completeSubmissionUI(regId, payload) {
  // Save to localStorage as backup
  try {
    const existing = JSON.parse(localStorage.getItem('BALSONS_SAVED_REGISTRATIONS') || '[]');
    existing.push({ regId: regId, timestamp: new Date().toISOString(), payload: payload });
    localStorage.setItem('BALSONS_SAVED_REGISTRATIONS', JSON.stringify(existing));
  } catch (e) {
    console.warn('[Registration] LocalStorage backup notice:', e);
  }`;

const newCompleteSubStart = `function completeSubmissionUI(regId, payload) {
  // Save to localStorage as backup
  try {
    const existing = JSON.parse(localStorage.getItem('BALSONS_SAVED_REGISTRATIONS') || '[]');
    existing.push({ regId: regId, timestamp: new Date().toISOString(), payload: payload });
    localStorage.setItem('BALSONS_SAVED_REGISTRATIONS', JSON.stringify(existing));

    if (payload.photoData) {
      const photos = JSON.parse(localStorage.getItem('BALSONS_EMPLOYEE_PHOTOS') || '{}');
      photos[regId] = payload.photoData;
      if (payload.aadhaarNo) photos[payload.aadhaarNo] = payload.photoData;
      if (payload.mobile) photos[payload.mobile] = payload.photoData;
      localStorage.setItem('BALSONS_EMPLOYEE_PHOTOS', JSON.stringify(photos));
    }
  } catch (e) {
    console.warn('[Registration] LocalStorage backup notice:', e);
  }`;

if (html.includes(oldCompleteSubStart)) {
  html = html.replace(oldCompleteSubStart, newCompleteSubStart);
  console.log('✅ Updated completeSubmissionUI photo persistence');
}

// 8. UPDATE receipt photo population
const oldPopulateReceipt = `document.getElementById('receiptRegId').textContent = regId;`;
const newPopulateReceipt = `document.getElementById('receiptRegId').textContent = regId;
    if (payload.photoData) {
      const pImg = document.getElementById('receiptPhotoImg');
      if (pImg) {
        pImg.src = payload.photoData;
        pImg.style.display = 'block';
      }
    }`;

if (html.includes(oldPopulateReceipt)) {
  html = html.replace(oldPopulateReceipt, newPopulateReceipt);
  console.log('✅ Updated receipt photo image display');
}

// 9. UPDATE clearForm to remove passport photo
const oldClearForm = `function clearForm() {
  if (!confirm('Are you sure you want to clear all form entries?')) return;
  document.getElementById('balsonsEmployeeRegistrationForm').reset();`;

const newClearForm = `function clearForm() {
  if (!confirm('Are you sure you want to clear all form entries?')) return;
  document.getElementById('balsonsEmployeeRegistrationForm').reset();
  removePassportPhoto();`;

if (html.includes(oldClearForm)) {
  html = html.replace(oldClearForm, newClearForm);
  console.log('✅ Updated clearForm to remove passport photo');
}

fs.writeFileSync('BALSONS HR MANAGER/frontend/register.html', html, 'utf8');
console.log('Successfully wrote updates to register.html!');
