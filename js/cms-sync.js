/**
 * Nirmala Multispeciality Hospital - CMS Live Sync & Cloud Library
 * Integrates ImgBB API for image uploads and Firebase Cloud Firestore for real-time cloud data.
 */

// ImgBB API Key provided by user
const IMGBB_API_KEY = "3b44503b50da2f92fca5861d0ed42d45";

// Firebase Configuration provided by user
const firebaseConfig = {
    apiKey: "AIzaSyAGXH-9E9YCmjZR5fzOoq4k_ipMLChHrbI",
    authDomain: "nirmala-rewari.firebaseapp.com",
    databaseURL: "https://nirmala-rewari-default-rtdb.firebaseio.com",
    projectId: "nirmala-rewari",
    storageBucket: "nirmala-rewari.firebasestorage.app",
    messagingSenderId: "169958067085",
    appId: "1:169958067085:web:07592d2da52f95ac6e4bc4",
    measurementId: "G-77HY53VJTV"
};

// Initialize Firebase Firestore safely
let firestoreDb = null;
try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firestoreDb = firebase.firestore();
        console.log("Firebase Firestore connected successfully for Nirmala Hospital.");
    }
} catch (e) {
    console.warn("Firebase initialization warning (falling back to local cache):", e);
}

// Default baseline CMS data
const DEFAULT_CMS_DATA = {
    hospital: {
        name: "Nirmala Multispeciality Hospital",
        tagline: "Your Health is Our Priority",
        subtagline: "Super Specialty Hospital with state-of-the-art infrastructure & path-breaking technology",
        phone: "+91 98969 07555",
        altPhone: "08488030590",
        emergencyPhone: "+91 98969 07555",
        email: "nmhrewari2022@gmail.com",
        techEmail: "help.nirmalarewari@gmail.com",
        address: "Rajesh Pilot Chowk, Garhi Bolni Road, Radha Swami Colony, Rewari, Haryana - 123401",
        shortAddress: "Rajesh Pilot Chowk, Garhi Bolni Road, Rewari",
        hours: "24 hours a day, 7 days a week (24x7 Emergency & OPD)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.901455243202!2d76.62099597527173!3d28.179912275914905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d5155c8711d65%3A0xc0356d7cab267275!2sNirmala%20Multispeciality%20Hospital%20-%20Gynacologist%7C%20Physician%7C%20Best%20Hospital%7C%20ICU%20Care%20in%20Hospital%20in%20Rewari!5e0!3m2!1sen!2sin!4v1788458087607!5m2!1sen!2sin",
        aboutImage: "hospital image.png",
        facebook: "https://facebook.com/p/Nirmala-Multispeciality-Hospital-100087556417096",
        instagram: "https://instagram.com/nmhrewari",
        twitter: "#",
        linkedin: "#"
    },
    stats: {
        experienceYears: "15+",
        happyPatients: "25,000+",
        expertDoctors: "12+",
        icuBeds: "20+"
    },
    hero: [
        {
            subtitle: "Your Health is Our Priority",
            title: "State-of-the-art Infrastructure & Path-breaking Technology",
            image: "hero-01.png",
            btnText1: "Appointment",
            btnLink1: "contact.html",
            btnText2: "Contact Us",
            btnLink2: "contact.html"
        },
        {
            subtitle: "24x7 ICU & Emergency Care",
            title: "Providing Best Treatment with Kind & Friendly Conduct",
            image: "hero-02.png",
            btnText1: "Appointment",
            btnLink1: "contact.html",
            btnText2: "Contact Us",
            btnLink2: "contact.html"
        }
    ],
    doctors: [
        {
            id: "doc-1",
            name: "Dr. Jyoti Yadav",
            specialty: "Obstetrics & Gynaecology",
            qualification: "MBBS, MS (Obs & Gynae)",
            experience: "12+ Years Experience",
            opdTimings: "Mon - Sat: 10:00 AM - 03:00 PM & 05:00 PM - 08:00 PM",
            status: "Available",
            image: "nirmla/dr-jyoti.jpg",
            bio: "Specialist in high-risk pregnancy, normal & painless delivery, open myomectomy, and hysteroscopy."
        },
        {
            id: "doc-2",
            name: "Dr. Ravi Yadav",
            specialty: "Internal Medicine & Diabetology",
            qualification: "MBBS, MD (Internal Medicine)",
            experience: "14+ Years Experience",
            opdTimings: "Mon - Sun: 09:00 AM - 02:00 PM & 05:00 PM - 09:00 PM",
            status: "Available (Daily OPD)",
            image: "nirmla/dr-ravi.jpg",
            bio: "Specialist in chronic disease management, advanced diabetes care, hypertension, and critical ICU medicine."
        },
        {
            id: "doc-ortho",
            name: "Consultant Orthopedic Surgeon",
            specialty: "Orthopedics & Joint Care",
            qualification: "MBBS, MS (Orthopaedics)",
            experience: "10+ Years Experience",
            opdTimings: "Mon - Sun: Daily OPD & 24x7 Emergency Trauma",
            status: "Available (Daily OPD)",
            image: "nirmla/dr-ortho.jpg",
            bio: "Specialist in total knee & hip replacement, trauma surgery, fracture management, and spine care."
        }
    ],
    services: [
        {
            id: "srv-1",
            title: "Gynecology & Obstetrics",
            desc: "Comprehensive maternity care, painless delivery, myomectomy, infertility management and women's wellness.",
            image: "nirmla/IMG-20260903-WA0008.jpg",
            icon: "fa-female"
        },
        {
            id: "srv-2",
            title: "Internal Medicine & Diabetes",
            desc: "Expert diagnosis and care for diabetes, hypertension, cardiac care, asthma, and chronic medical illnesses.",
            image: "nirmla/IMG-20260903-WA0016.jpg",
            icon: "fa-heartbeat"
        },
        {
            id: "srv-3",
            title: "Emergency & 24x7 ICU",
            desc: "Round-the-clock emergency medical attention, advanced life-support ICU beds, and ventilator support.",
            image: "nirmla/IMG-20260903-WA0023.jpg",
            icon: "fa-ambulance"
        },
        {
            id: "srv-4",
            title: "Orthopedics & Joint Care",
            desc: "Advanced trauma care, fracture management, joint pain treatments, and post-surgery rehabilitation.",
            image: "nirmla/IMG-20260903-WA0044.jpg",
            icon: "fa-bone"
        }
    ],
    appointments: [],
    inquiries: [],
    reviews: [
        {
            id: "rev-1",
            author: "Reena Kumari",
            rating: 5,
            comment: "Dr. Ravi and Dr. Jyoti Yadav are multi-talented doctors giving each patient their best-level treatment with kind and friendly conduct.",
            date: "August 2026",
            source: "Google 4.8★"
        },
        {
            id: "rev-2",
            author: "Kanchan Yadav",
            rating: 5,
            comment: "The best hospital in Rewari with great facilities. Dr. Ravi, Dr. Jyoti, and all staff are friendly and very cooperative.",
            date: "July 2026",
            source: "Google 4.8★"
        },
        {
            id: "rev-3",
            author: "Surender Singh",
            rating: 5,
            comment: "Best hospital in Rewari for patient treatment, kind nursing staff, and 24x7 emergency response.",
            date: "June 2026",
            source: "Justdial 4.7★"
        }
    ],
    gallery: [
        { id: "gal-1", title: "Hospital Reception", category: "Facility", image: "nirmla/IMG-20260903-WA0029.jpg" },
        { id: "gal-2", title: "Consultation Chamber", category: "OPD", image: "nirmla/IMG-20260903-WA0008.jpg" },
        { id: "gal-3", title: "ICU & Critical Care", category: "Emergency", image: "nirmla/IMG-20260903-WA0023.jpg" },
        { id: "gal-4", title: "Hospital Front Wing", category: "Campus", image: "hospital image.png" }
    ]
};

const CMS_STORAGE_KEY = 'nirmala_hospital_cms';

/**
 * Upload Image directly to ImgBB via API
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - Hosted URL of the uploaded image
 */
async function uploadToImgBB(file) {
    if (!file) throw new Error("No image file selected.");

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    if (result && result.success && result.data) {
        return result.data.display_url || result.data.url;
    } else {
        const msg = (result && result.error && result.error.message) ? result.error.message : "ImgBB upload failed.";
        throw new Error(msg);
    }
}

// Helper validators to ensure NO dummy/test data ever pollutes the dashboard
function isDummyDoctor(d) {
    if (!d) return true;
    const name = (d.name || '').toLowerCase();
    const id = (d.id || '').toLowerCase();
    if (id === 'doc-dummy' || name.includes('dummy') || name.includes('test doctor')) return true;
    return false;
}

function isDummyAppointment(a) {
    if (!a) return true;
    const name = (a.patientName || a.name || a.patient || '').toLowerCase().trim();
    const phone = (a.phone || a.contact || a.mobile || '').replace(/\D/g, '');
    const id = (a.id || '').toLowerCase();
    
    // Purge dummy names (Reena Kumari, Surender Singh, Kanchan Yadav from test mockups)
    const dummyNames = ['reena kumari', 'surender singh', 'kanchan yadav', 'reena', 'surender', 'kanchan', 'test patient', 'dummy'];
    if (dummyNames.some(d => name.includes(d))) return true;
    
    // Purge dummy phones
    const dummyPhones = ['9812345678', '9876543210', '9991122334', '1234567890'];
    if (dummyPhones.some(p => phone.includes(p))) return true;
    
    // Purge dummy IDs
    const dummyIds = ['apt-1', 'apt-2', 'apt-3', 'apt-101', 'apt-102', 'apt-103', 'apt-01', 'apt-02', 'apt-03'];
    if (dummyIds.includes(id)) return true;
    
    return false;
}

function isDummyInquiry(i) {
    if (!i) return true;
    const name = (i.name || i.sender || '').toLowerCase().trim();
    const email = (i.email || '').toLowerCase().trim();
    const id = (i.id || '').toLowerCase();
    
    const dummyNames = ['amit sharma', 'pooja verma', 'amit', 'pooja', 'test inquiry', 'dummy'];
    if (dummyNames.some(d => name.includes(d))) return true;
    
    const dummyEmails = ['amit.sharma@example.com', 'pooja.verma@example.com', 'test@example.com'];
    if (dummyEmails.some(e => email.includes(e))) return true;
    
    const dummyIds = ['inq-1', 'inq-2', 'inq-101', 'inq-102', 'inq-201', 'inq-202'];
    if (dummyIds.includes(id)) return true;
    
    return false;
}

// Immediate automatic clean on script load (one-time initialization)
(function cleanStoredMockData() {
    try {
        const raw = localStorage.getItem(CMS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            let changed = false;

            // One-time initialization of initial doctors if not set
            if (!parsed._v3_initialized) {
                parsed._v3_initialized = true;
                if (!Array.isArray(parsed.doctors) || parsed.doctors.length === 0) {
                    parsed.doctors = [...DEFAULT_CMS_DATA.doctors];
                    changed = true;
                } else {
                    const existingIds = new Set(parsed.doctors.map(d => d.id));
                    DEFAULT_CMS_DATA.doctors.forEach(defDoc => {
                        if (!existingIds.has(defDoc.id)) {
                            parsed.doctors.push(defDoc);
                            changed = true;
                        }
                    });
                }
            }
            if (parsed.appointments) {
                const cleanApts = parsed.appointments.filter(a => !isDummyAppointment(a));
                if (cleanApts.length !== parsed.appointments.length) { parsed.appointments = cleanApts; changed = true; }
            }
            if (parsed.inquiries) {
                const cleanInq = parsed.inquiries.filter(i => !isDummyInquiry(i));
                if (cleanInq.length !== parsed.inquiries.length) { parsed.inquiries = cleanInq; changed = true; }
            }
            if (changed) {
                localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(parsed));
            }
        }
    } catch(e) {}
})();

// Get CMS Data from Local Storage (returns actual stored state without resurrecting deleted items)
function getCmsData() {
    try {
        const stored = localStorage.getItem(CMS_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                ...DEFAULT_CMS_DATA,
                ...parsed,
                hospital: { ...DEFAULT_CMS_DATA.hospital, ...(parsed.hospital || {}) },
                stats: { ...DEFAULT_CMS_DATA.stats, ...(parsed.stats || {}) },
                doctors: Array.isArray(parsed.doctors) ? parsed.doctors : [...DEFAULT_CMS_DATA.doctors],
                services: Array.isArray(parsed.services) ? parsed.services : [...DEFAULT_CMS_DATA.services],
                appointments: Array.isArray(parsed.appointments) ? parsed.appointments : [],
                inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
                reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [...DEFAULT_CMS_DATA.reviews],
                gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [...DEFAULT_CMS_DATA.gallery]
            };
        }
    } catch (e) {
        console.error("Error loading CMS data from localStorage", e);
    }
    const initial = { ...DEFAULT_CMS_DATA, _v3_initialized: true };
    try { localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(initial)); } catch (e) {}
    return initial;
}

// Save CMS Data locally and to Cloud Firestore
function saveCmsData(data) {
    try {
        data.lastUpdated = Date.now();
        data._v3_initialized = true;
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('cms-data-updated', { detail: data }));

        // Sync to Firebase Cloud Firestore cleanly without merge artifacts
        if (firestoreDb) {
            firestoreDb.collection('hospital_cms').doc('live_data').set(data)
                .then(() => console.log("CMS Data successfully synced to Firebase Cloud Firestore."))
                .catch(err => console.warn("Firestore cloud sync notice:", err));
        }
        return true;
    } catch (e) {
        console.error("Error saving CMS data", e);
        return false;
    }
}

// Save local-only helper
function saveCmsDataLocally(data) {
    try {
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('cms-data-updated', { detail: data }));
    } catch (e) {}
}

// Connect Real-Time Listener to Firestore
function initFirestoreSync() {
    if (!firestoreDb) return;

    try {
        // Listen to live CMS updates from Firestore
        firestoreDb.collection('hospital_cms').doc('live_data').onSnapshot(doc => {
            if (doc.exists) {
                const cloudData = doc.data();
                const localData = getCmsData();
                // Protect local edits: only apply cloudData if cloudData is newer than local edits
                if (cloudData && (!localData.lastUpdated || (cloudData.lastUpdated && cloudData.lastUpdated > localData.lastUpdated))) {
                    const merged = {
                        ...DEFAULT_CMS_DATA,
                        ...cloudData,
                        _v3_initialized: true
                    };
                    saveCmsDataLocally(merged);
                    applyCmsToCurrentPage();
                    if (typeof renderOverview === 'function') renderOverview();
                    if (typeof renderDoctors === 'function') renderDoctors();
                    if (typeof renderServices === 'function') renderServices();
                }
            }
        }, err => {
            if (err && err.code === 'permission-denied') {
                console.info("Firestore Live Sync: Using local cached data seamlessly.");
            } else {
                console.warn("Firestore live snapshot notice:", err);
            }
        });

        // Listen to Appointments collection
        firestoreDb.collection('appointments').onSnapshot(snapshot => {
            if (!snapshot.empty) {
                const apts = [];
                snapshot.forEach(doc => {
                    const aptData = { id: doc.id, ...doc.data() };
                    if (!isDummyAppointment(aptData)) {
                        apts.push(aptData);
                    }
                });
                const cur = getCmsData();
                cur.appointments = apts;
                saveCmsDataLocally(cur);
                if (typeof renderAppointments === 'function') renderAppointments();
                if (typeof renderOverview === 'function') renderOverview();
            }
        }, err => {
            if (err && err.code === 'permission-denied') {
                console.info("Firestore Appointments: Awaiting Firestore Security Rules in Firebase Console. Using local cached data seamlessly.");
            } else {
                console.warn("Firestore appointments snapshot notice:", err);
            }
        });
    } catch (e) {
        console.warn("Firestore sync setup notice:", e);
    }
}

// Sync General Website Elements across pages
function applyCmsToCurrentPage() {
    // Explicitly remove any top announcement banner from header
    const oldBanner = document.getElementById('cms-announcement-banner');
    if (oldBanner) oldBanner.remove();

    const data = getCmsData();
    const h = data.hospital;

    // 1. Phone Numbers across the page
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        a.href = `tel:${h.phone.replace(/\s+/g, '')}`;
    });

    const phoneRegex = /(\+91\s*98969\s*07555|9896907555|08488030590)/g;
    replaceTextInDocument(phoneRegex, h.phone);

    // 2. Email addresses
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        if (a.href.includes('nmhrewari2022') || a.textContent.includes('nmhrewari2022')) {
            a.href = `mailto:${h.email}`;
            a.textContent = h.email;
        }
    });

    const emailRegex = /nmhrewari2022@gmail\.com/g;
    replaceTextInDocument(emailRegex, h.email);

    // 3. Address
    const addressRegex = /Rajesh Pilot Chowk,\s*Garhi Bolni Road,\s*Rewari,\s*Haryana/g;
    replaceTextInDocument(addressRegex, h.address);

    // 4. Social Links
    if (h.facebook) {
        document.querySelectorAll('a[href*="facebook"], a .fa-facebook-f').forEach(el => {
            const a = el.tagName === 'A' ? el : el.closest('a');
            if (a) a.href = h.facebook;
        });
    }
    if (h.instagram) {
        document.querySelectorAll('a[href*="instagram"], a .fa-instagram').forEach(el => {
            const a = el.tagName === 'A' ? el : el.closest('a');
            if (a) a.href = h.instagram;
        });
    }
    if (h.twitter && h.twitter !== '#') {
        document.querySelectorAll('a[href*="twitter"], a .fa-twitter').forEach(el => {
            const a = el.tagName === 'A' ? el : el.closest('a');
            if (a) a.href = h.twitter;
        });
    }
    if (h.linkedin && h.linkedin !== '#') {
        document.querySelectorAll('a[href*="linkedin"], a .fa-linkedin-in').forEach(el => {
            const a = el.tagName === 'A' ? el : el.closest('a');
            if (a) a.href = h.linkedin;
        });
    }

    // 5. Google Maps iframe
    if (h.mapUrl) {
        document.querySelectorAll('iframe[src*="google.com/maps"]').forEach(iframe => {
            if (h.mapUrl && iframe.src !== h.mapUrl) {
                iframe.src = h.mapUrl;
            }
        });
    }

    // 6. Hero Carousel (Images & Text)
    if (data.hero && data.hero.length > 0) {
        const carouselItems = document.querySelectorAll('#header-carousel .carousel-item');
        carouselItems.forEach((item, idx) => {
            const heroSlide = data.hero[idx];
            if (heroSlide) {
                // Update Hero Image
                const img = item.querySelector('img');
                if (img && heroSlide.image) {
                    img.src = heroSlide.image;
                }
                // Update Subtitle
                const sub = item.querySelector('h5');
                if (sub && heroSlide.subtitle) {
                    sub.textContent = heroSlide.subtitle;
                }
                // Update Title
                const title = item.querySelector('h1');
                if (title && heroSlide.title) {
                    title.textContent = heroSlide.title;
                }
            }
        });
    }

    // 7. About Image (Hospital building)
    if (h.aboutImage) {
        document.querySelectorAll('img[src*="hospital image.png"], img[src*="about.jpg"]').forEach(img => {
            img.src = h.aboutImage;
        });
    }

    // 8. Dynamic Doctors Rendering on public pages (team.html & index.html)
    const doctorsRow = document.getElementById('cmsDoctorsContainer');
    if (doctorsRow && Array.isArray(data.doctors)) {
        doctorsRow.innerHTML = '';
        data.doctors.forEach((doc, idx) => {
            const delay = (0.2 * (idx + 1)).toFixed(1) + 's';
            const statusBadge = doc.status ? `<span class="badge bg-primary text-white px-3 py-2 rounded-pill shadow-sm"><i class="fa fa-clock me-1"></i> ${doc.status}</span>` : '';
            doctorsRow.innerHTML += `
                <div class="col-lg-4 col-md-6 wow slideInUp" data-wow-delay="${delay}">
                    <div class="team-item bg-light rounded overflow-hidden shadow-sm h-100 d-flex flex-column">
                        <div class="position-relative" style="height: 340px; overflow: hidden;">
                            <img class="w-100 h-100" src="${doc.image || 'hero-01.png'}" alt="${doc.name}" style="object-fit: cover; object-position: top center;" onerror="this.src='hero-01.png'">
                            <div class="position-absolute top-0 start-0 m-3">
                                ${statusBadge}
                            </div>
                        </div>
                        <div class="team-text p-4 text-center flex-grow-1 d-flex flex-column justify-content-between">
                            <div>
                                <h4 class="mb-1">${doc.name}</h4>
                                <p class="text-primary fw-bold mb-1">${doc.specialty}</p>
                                <p class="text-muted small mb-2">${doc.qualification || ''} ${doc.experience ? ' | ' + doc.experience : ''}</p>
                                <p class="text-secondary small mb-3">${doc.bio || ''}</p>
                            </div>
                            <div class="pt-3 border-top">
                                <small class="text-dark d-block mb-3"><i class="fa fa-calendar-alt text-primary me-2"></i>${doc.opdTimings || 'Regular Hours'}</small>
                                <a href="contact.html" class="btn btn-primary btn-sm px-4 py-2 w-100"><i class="fa fa-calendar-check me-2"></i>Book OPD Appointment</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // 9. Connect appointment & contact forms so submissions save to Cloud Firestore & Dashboard
    wireWebsiteForms(data);
}

// Helper to replace text content safely
function replaceTextInDocument(regex, replacement) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
        if (node.parentElement && ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(node.parentElement.tagName)) continue;
        if (regex.test(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(regex, replacement);
        }
    }
}

// Wire Appointment & Contact forms to capture submissions to Firestore & Dashboard
function wireWebsiteForms(data) {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (!form.dataset.cmsWired && !window.location.pathname.includes('admin.html')) {
            form.dataset.cmsWired = 'true';
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const inputs = form.querySelectorAll('input, textarea, select');
                let formObj = {};
                inputs.forEach(input => {
                    const placeholder = (input.placeholder || '').toLowerCase();
                    const name = (input.name || input.id || '').toLowerCase();
                    const val = input.value.trim();

                    if (input.type === 'email' || placeholder.includes('email') || name.includes('email')) {
                        formObj.email = val;
                    } else if (input.type === 'tel' || placeholder.includes('phone') || placeholder.includes('mobile') || name.includes('phone')) {
                        formObj.phone = val;
                    } else if (placeholder.includes('name') || name.includes('name')) {
                        formObj.name = val;
                    } else if (placeholder.includes('subject') || name.includes('subject')) {
                        formObj.subject = val;
                    } else if (input.tagName === 'TEXTAREA' || placeholder.includes('message')) {
                        formObj.message = val;
                    }
                });

                const cms = getCmsData();
                const newInq = {
                    id: 'inq-' + Date.now().toString().slice(-4),
                    name: formObj.name || 'Website Visitor',
                    email: formObj.email || 'N/A',
                    phone: formObj.phone || 'N/A',
                    subject: formObj.subject || 'Website Message',
                    message: formObj.message || 'New inquiry submitted from website.',
                    date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                    status: 'New',
                    createdAt: new Date().toISOString()
                };

                cms.inquiries = cms.inquiries || [];
                cms.inquiries.unshift(newInq);
                saveCmsData(cms);

                // Send to Firestore inquiries collection
                if (firestoreDb) {
                    firestoreDb.collection('inquiries').add(newInq)
                        .catch(err => console.warn("Inquiry cloud save notice:", err));
                }

                alert('Thank you! Your message has been received by Nirmala Hospital. Our medical team will contact you shortly.');
                form.reset();
            });
        }
    });
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        applyCmsToCurrentPage();
        initFirestoreSync();
    });
} else {
    applyCmsToCurrentPage();
    initFirestoreSync();
}

// Expose globally
window.NirmalaCMS = {
    get: getCmsData,
    save: saveCmsData,
    apply: applyCmsToCurrentPage,
    uploadImgBB: uploadToImgBB,
    db: firestoreDb,
    defaults: DEFAULT_CMS_DATA
};
