let qrCode;
let logoBase64 = "";
let centerMode = "image";
let centerText = "";

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const docente = urlParams.get("docente");
    const grupo = urlParams.get("grupo");
    const comision = urlParams.get("comision");

    if (docente) {
        showAssignment(docente, grupo, comision);
        return;
    }

    if (typeof QRCodeStyling !== "undefined") {
        initQR();
    } else {
        const checkLibrary = setInterval(() => {
            if (typeof QRCodeStyling !== "undefined") {
                clearInterval(checkLibrary);
                initQR();
            }
        }, 100);
    }
});

function showAssignment(docente, grupo, comision) {
    const appHeader = document.querySelector(".app-header");
    const appContainer = document.querySelector(".app-container");
    const appFooter = document.querySelector(".app-footer");
    
    if (appHeader) appHeader.style.display = "none";
    if (appContainer) appContainer.style.display = "none";
    if (appFooter) appFooter.style.display = "none";

    const displayScreen = document.getElementById("assignment-display");
    if (displayScreen) {
        displayScreen.style.display = "flex";
        document.getElementById("display-teacher-name").innerText = docente;
        document.getElementById("display-group-name").innerText = grupo || "No asignado";
        document.getElementById("display-commission-name").innerText = comision || "Ninguna";
    }
}

function initQR() {
    const canvasHolder = document.getElementById("qr-canvas-holder");
    if (!canvasHolder) return;

    qrCode = new QRCodeStyling({
        width: 330,
        height: 330,
        type: "canvas",
        data: "https://portfolioantonioheredia.netlify.app/",
        image: "",
        dotsOptions: {
            color: "#0f172a",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        cornersSquareOptions: {
            color: "#0f172a",
            type: "extra-rounded"
        },
        cornersDotOptions: {
            color: "#0f172a",
            type: "dot"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            hideBackgroundDots: true,
            imageSize: 0.35,
            margin: 5
        },
        qrOptions: {
            typeNumber: 0,
            mode: "Byte",
            errorCorrectionLevel: "Q"
        }
    });

    canvasHolder.innerHTML = "";
    qrCode.append(canvasHolder);

    setupEventListeners();
    
    const inputUrl = document.getElementById("input-url");
    if (inputUrl) {
        inputUrl.value = "portfolioantonioheredia.netlify.app/";
        updateQRData();
    }
}

function setupEventListeners() {
    const tabs = document.querySelectorAll(".tab-btn");
    const groups = document.querySelectorAll(".inputs-group");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            groups.forEach(g => g.classList.remove("active"));
            const targetGroup = document.getElementById(`group-${tab.dataset.type}`);
            if (targetGroup) {
                targetGroup.classList.add("active");
            }

            updateQRData();
        });
    });

    const textInputs = document.querySelectorAll(".form-input, textarea");
    textInputs.forEach(input => {
        input.addEventListener("input", debounce(() => {
            updateQRData();
        }, 200));

        input.addEventListener("change", () => {
            updateQRData();
        });
    });

    const wifiHidden = document.getElementById("input-wifi-hidden");
    if (wifiHidden) {
        wifiHidden.addEventListener("change", () => {
            updateQRData();
        });
    }

    const wifiSecurity = document.getElementById("input-wifi-security");
    const wifiPassContainer = document.getElementById("wifi-pass-container");
    if (wifiSecurity && wifiPassContainer) {
        wifiSecurity.addEventListener("change", () => {
            if (wifiSecurity.value === "nopass") {
                wifiPassContainer.style.opacity = "0.3";
                wifiPassContainer.style.pointerEvents = "none";
                const passInput = document.getElementById("input-wifi-password");
                if (passInput) passInput.value = "";
            } else {
                wifiPassContainer.style.opacity = "1";
                wifiPassContainer.style.pointerEvents = "all";
            }
            updateQRData();
        });
    }

    const schoolGroupSelect = document.getElementById("input-school-group");
    const schoolCustomGroupContainer = document.getElementById("school-custom-group-container");
    if (schoolGroupSelect && schoolCustomGroupContainer) {
        schoolGroupSelect.addEventListener("change", () => {
            if (schoolGroupSelect.value === "custom") {
                schoolCustomGroupContainer.style.display = "block";
            } else {
                schoolCustomGroupContainer.style.display = "none";
                const customGroupInput = document.getElementById("input-school-custom-group");
                if (customGroupInput) customGroupInput.value = "";
            }
            updateQRData();
        });
    }

    const fgColorInput = document.getElementById("input-fg-color");
    const bgColorInput = document.getElementById("input-bg-color");
    const fgLabel = document.getElementById("lbl-fg-color");
    const bgLabel = document.getElementById("lbl-bg-color");

    if (fgColorInput && fgLabel) {
        fgColorInput.addEventListener("input", (e) => {
            const val = e.target.value.toUpperCase();
            fgLabel.innerText = val;
            updateQROptions();
        });
    }
    if (bgColorInput && bgLabel) {
        bgColorInput.addEventListener("input", (e) => {
            const val = e.target.value.toUpperCase();
            bgLabel.innerText = val;
            updateQROptions();
        });
    }

    const designInputs = [
        document.getElementById("input-dot-type"),
        document.getElementById("input-corner-square-type"),
        document.getElementById("input-corner-dot-type"),
        document.getElementById("input-ecc")
    ];

    designInputs.forEach(el => {
        if (el) {
            el.addEventListener("change", () => {
                updateQROptions();
            });
        }
    });

    const logoFileInput = document.getElementById("input-logo-file");
    const logoPreviewArea = document.getElementById("logo-preview-area");
    const logoPreviewImg = document.getElementById("logo-preview-img");
    const clearLogoBtn = document.getElementById("button-clear-logo");
    const eccSelect = document.getElementById("input-ecc");

    if (logoFileInput && logoPreviewArea && logoPreviewImg && clearLogoBtn) {
        logoFileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    logoBase64 = event.target.result;
                    logoPreviewImg.src = logoBase64;
                    logoPreviewArea.style.display = "flex";
                    
                    if (eccSelect && (eccSelect.value === "L" || eccSelect.value === "M")) {
                        eccSelect.value = "H";
                    }
                    
                    updateQROptions();
                };
                reader.readAsDataURL(file);
            }
        });

        clearLogoBtn.addEventListener("click", () => {
            logoFileInput.value = "";
            logoBase64 = "";
            logoPreviewArea.style.display = "none";
            logoPreviewImg.src = "";
            updateQROptions();
        });
    }

    const btnOptImage = document.getElementById("btn-opt-logo-image");
    const btnOptText = document.getElementById("btn-opt-logo-text");
    const wrapperImage = document.getElementById("wrapper-logo-image");
    const wrapperText = document.getElementById("wrapper-logo-text");
    const centerTextInput = document.getElementById("input-center-text");

    if (btnOptImage && btnOptText && wrapperImage && wrapperText) {
        btnOptImage.addEventListener("click", () => {
            btnOptImage.classList.add("active");
            btnOptText.classList.remove("active");
            wrapperImage.style.display = "flex";
            wrapperText.style.display = "none";
            centerMode = "image";
            updateQROptions();
        });

        btnOptText.addEventListener("click", () => {
            btnOptText.classList.add("active");
            btnOptImage.classList.remove("active");
            wrapperText.style.display = "block";
            wrapperImage.style.display = "none";
            centerMode = "text";
            updateQROptions();
        });
    }

    if (centerTextInput) {
        centerTextInput.addEventListener("input", (e) => {
            centerText = e.target.value.trim();
            updateQROptions();
        });
    }

    const logoSizeInput = document.getElementById("input-logo-size");
    const logoSizeLabel = document.getElementById("lbl-logo-size-value");
    if (logoSizeInput && logoSizeLabel) {
        logoSizeInput.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value);
            logoSizeLabel.innerText = `${Math.round(val * 100)}%`;
            updateQROptions();
        });
    }

    const sizeInput = document.getElementById("input-size");
    const sizeLabel = document.getElementById("lbl-size-value");
    const downloadBtn = document.getElementById("button-download");

    if (sizeInput && sizeLabel) {
        sizeInput.addEventListener("input", (e) => {
            const val = e.target.value;
            sizeLabel.innerText = `${val} x ${val} px`;
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            triggerDownload();
        });
    }
}

function getActiveQRData() {
    const activeTab = document.querySelector(".tab-btn.active");
    if (!activeTab) return "";
    
    const type = activeTab.dataset.type;
    
    switch (type) {
        case "url": {
            let url = document.getElementById("input-url").value.trim();
            if (url.length === 0) return "";
            
            if (!/^https?:\/\//i.test(url)) {
                url = "https://" + url;
            }
            return url;
        }
        case "text": {
            return document.getElementById("input-text").value;
        }
        case "wifi": {
            const ssid = document.getElementById("input-wifi-ssid").value.trim();
            const security = document.getElementById("input-wifi-security").value;
            const password = document.getElementById("input-wifi-password").value;
            const hidden = document.getElementById("input-wifi-hidden").checked;
            
            if (!ssid) return "";
            
            let wifiStr = `WIFI:S:${escapeWifiString(ssid)};T:${security};`;
            if (security !== "nopass") {
                wifiStr += `P:${escapeWifiString(password)};`;
            }
            if (hidden) {
                wifiStr += `H:true;`;
            }
            wifiStr += ";";
            return wifiStr;
        }
        case "vcard": {
            const first = document.getElementById("input-vcard-first").value.trim();
            const last = document.getElementById("input-vcard-last").value.trim();
            const phone = document.getElementById("input-vcard-phone").value.trim();
            const email = document.getElementById("input-vcard-email").value.trim();
            const company = document.getElementById("input-vcard-company").value.trim();
            const job = document.getElementById("input-vcard-job").value.trim();
            const website = document.getElementById("input-vcard-website").value.trim();
            const address = document.getElementById("input-vcard-address").value.trim();
            
            if (!first) return "";
            
            let vcard = "BEGIN:VCARD\nVERSION:3.0\n";
            vcard += `N:${last};${first};;;\n`;
            vcard += `FN:${first} ${last}\n`;
            if (company) vcard += `ORG:${company}\n`;
            if (job) vcard += `TITLE:${job}\n`;
            if (phone) vcard += `TEL;TYPE=CELL:${phone}\n`;
            if (email) vcard += `EMAIL;TYPE=INTERNET:${email}\n`;
            if (website) {
                let formattedWeb = website;
                if (!/^https?:\/\//i.test(formattedWeb)) {
                    formattedWeb = "https://" + formattedWeb;
                }
                vcard += `URL:${formattedWeb}\n`;
            }
            if (address) vcard += `ADR;TYPE=WORK:;;${address};;;;\n`;
            vcard += "END:VCARD";
            return vcard;
        }
        case "email": {
            const to = document.getElementById("input-email-to").value.trim();
            const subject = document.getElementById("input-email-subject").value.trim();
            const body = document.getElementById("input-email-body").value;
            
            if (!to) return "";
            
            let emailStr = `mailto:${to}`;
            const params = [];
            if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
            if (body) params.push(`body=${encodeURIComponent(body)}`);
            if (params.length > 0) {
                emailStr += `?${params.join("&")}`;
            }
            return emailStr;
        }
        case "whatsapp": {
            let phone = document.getElementById("input-wa-phone").value.trim();
            phone = phone.replace(/[\s\+\-()]/g, "");
            const message = document.getElementById("input-wa-message").value;
            
            if (!phone) return "";
            
            let waUrl = `https://wa.me/${phone}`;
            if (message) {
                waUrl += `?text=${encodeURIComponent(message)}`;
            }
            return waUrl;
        }
        case "phone": {
            const phone = document.getElementById("input-phone").value.trim();
            if (!phone) return "";
            return `tel:${phone}`;
        }
        case "sms": {
            const phone = document.getElementById("input-sms-phone").value.trim();
            const message = document.getElementById("input-sms-message").value;
            
            if (!phone) return "";
            
            let smsStr = `sms:${phone}`;
            if (message) {
                smsStr += `?body=${encodeURIComponent(message)}`;
            }
            return smsStr;
        }
        case "school": {
            const teacher = document.getElementById("input-school-teacher").value.trim();
            const groupSelect = document.getElementById("input-school-group").value;
            const customGroup = document.getElementById("input-school-custom-group").value.trim();
            const commission = document.getElementById("input-school-commission").value.trim();
            
            if (!teacher) return "";
            
            const group = groupSelect === "custom" ? customGroup : groupSelect;
            
            const baseUrl = window.location.origin + window.location.pathname;
            const qrUrl = `${baseUrl}?docente=${encodeURIComponent(teacher)}&grupo=${encodeURIComponent(group)}&comision=${encodeURIComponent(commission)}`;
            
            return qrUrl;
        }
        default:
            return "";
    }
}

function escapeWifiString(str) {
    return str.replace(/\\/g, "\\\\")
              .replace(/;/g, "\\;")
              .replace(/:/g, "\\:")
              .replace(/,/g, "\\,");
}

function updateQRData() {
    if (!qrCode) return;

    const data = getActiveQRData();
    const canvasHolder = document.getElementById("qr-canvas-holder");
    const errorMessage = document.getElementById("qr-error-message");

    if (!data) {
        if (canvasHolder) canvasHolder.style.opacity = "0.2";
        if (errorMessage) errorMessage.style.display = "block";
    } else {
        if (canvasHolder) canvasHolder.style.opacity = "1";
        if (errorMessage) errorMessage.style.display = "none";
        
        qrCode.update({
            data: data
        });
    }
}

function updateQROptions() {
    if (!qrCode) return;

    const fgColor = document.getElementById("input-fg-color").value;
    const bgColor = document.getElementById("input-bg-color").value;
    const dotType = document.getElementById("input-dot-type").value;
    const cornerSquareType = document.getElementById("input-corner-square-type").value;
    const cornerDotType = document.getElementById("input-corner-dot-type").value;
    const ecc = document.getElementById("input-ecc").value;

    let centerImage = "";
    if (centerMode === "image") {
        centerImage = logoBase64 || "";
    } else if (centerMode === "text" && centerText) {
        centerImage = textToImage(centerText, fgColor, bgColor);
    }

    const logoSize = parseFloat(document.getElementById("input-logo-size").value) || 0.35;

    qrCode.update({
        dotsOptions: {
            color: fgColor,
            type: dotType
        },
        backgroundOptions: {
            color: bgColor
        },
        cornersSquareOptions: {
            color: fgColor,
            type: cornerSquareType
        },
        cornersDotOptions: {
            color: fgColor,
            type: cornerDotType
        },
        qrOptions: {
            errorCorrectionLevel: ecc
        },
        image: centerImage,
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: logoSize,
            margin: 5
        }
    });
}

function triggerDownload() {
    if (!qrCode) return;

    const data = getActiveQRData();
    if (!data) {
        alert("¡Por favor introduce la información necesaria en los campos obligatorios antes de descargar!");
        return;
    }

    const size = parseInt(document.getElementById("input-size").value) || 350;
    const format = document.getElementById("input-format").value || "png";

    const originalWidth = qrCode._options.width;
    const originalHeight = qrCode._options.height;

    qrCode.update({
        width: size,
        height: size
    });

    qrCode.download({
        name: `codigo-qr-${Date.now()}`,
        extension: format
    });

    setTimeout(() => {
        qrCode.update({
            width: originalWidth,
            height: originalHeight
        });
    }, 150);
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function textToImage(text, color, bgColor) {
    const canvas = document.createElement("canvas");
    canvas.width = 250;
    canvas.height = 250;
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(125, 125, 120, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();
    
    ctx.fillStyle = color;
    let fontSize = 65;
    if (text.length > 3) fontSize = 50;
    if (text.length > 6) fontSize = 35;
    if (text.length > 10) fontSize = 24;
    
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 125, 125);
    
    return canvas.toDataURL("image/png");
}
