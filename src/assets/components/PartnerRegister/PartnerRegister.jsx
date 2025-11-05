// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faStore,
//   faMapMarkerAlt,
//   faPhone,
//   faEnvelope,
//   faIdCard,
//   faUniversity,
//   faFileUpload,
//   faCheckCircle,
//   faArrowRight,
//   faArrowLeft,
//   faUtensils,
//   faClock,
//   faShieldAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import styles from "./PartnerRegister.module.css";

// export default function PartnerRegister() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Step 1 - Personal Info
//     fullName: "",
//     mobile: "",
//     email: "",

//     // Step 2 - Kitchen Info
//     kitchenName: "",
//     address: "",
//     pincode: "",
//     cuisineType: "",

//     // Step 3 - Documents
//     fssai: "",
//     pan: "",
//     gst: "",
//     accountNumber: "",
//     ifsc: "",

//     // Step 4 - Menu
//     menuFile: null,
//   });

//   const steps = [
//     { number: 1, title: "Personal Info", icon: faUser },
//     { number: 2, title: "Kitchen Details", icon: faStore },
//     { number: 3, title: "Documents", icon: faIdCard },
//     { number: 4, title: "Menu Upload", icon: faUtensils },
//   ];

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleNext = () => {
//     if (currentStep < 4) setCurrentStep(currentStep + 1);
//   };

//   const handlePrev = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Registration submitted! We'll review and get back to you within 24 hours.");
//   };

//   return (
//     <div className={styles.page}>
//       {/* Header */}
//       <header className={styles.header}>
//         <div className={styles.headerContent}>
//           <div className={styles.logo}>
//             <FontAwesomeIcon icon={faStore} />
//             <span>RAAVITO Partner</span>
//           </div>
//           <div className={styles.headerRight}>
//             <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
//             <span>Takes ~5 minutes</span>
//           </div>
//         </div>
//       </header>

//       <div className={styles.container}>
//         {/* Progress Steps */}
//         <div className={styles.progressWrapper}>
//           <div className={styles.progressSteps}>
//             {steps.map((step, index) => (
//               <div key={index} className={styles.progressItem}>
//                 <div
//                   className={`${styles.progressCircle} ${
//                     currentStep > step.number
//                       ? styles.completed
//                       : currentStep === step.number
//                         ? styles.active
//                         : ""
//                   }`}>
//                   {currentStep > step.number ? (
//                     <FontAwesomeIcon icon={faCheckCircle} />
//                   ) : (
//                     <FontAwesomeIcon icon={step.icon} />
//                   )}
//                 </div>
//                 <span className={styles.progressLabel}>{step.title}</span>
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`${styles.progressLine} ${currentStep > step.number ? styles.completed : ""}`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Card */}
//         <div className={styles.formCard}>
//           <form onSubmit={handleSubmit}>
//             {/* Step 1 - Personal Info */}
//             {currentStep === 1 && (
//               <div className={styles.stepContent}>
//                 <div className={styles.stepHeader}>
//                   <h2>Personal Information</h2>
//                   <p>Tell us about yourself</p>
//                 </div>

//                 <div className={styles.formGrid}>
//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
//                       Full Name *
//                     </label>
//                     <input
//                       type='text'
//                       name='fullName'
//                       placeholder='Enter your full name'
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faPhone} className={styles.inputIcon} />
//                       Mobile Number *
//                     </label>
//                     <input
//                       type='tel'
//                       name='mobile'
//                       placeholder='10-digit mobile number'
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
//                       Email Address *
//                     </label>
//                     <input
//                       type='email'
//                       name='email'
//                       placeholder='your.email@example.com'
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2 - Kitchen Info */}
//             {currentStep === 2 && (
//               <div className={styles.stepContent}>
//                 <div className={styles.stepHeader}>
//                   <h2>Kitchen Details</h2>
//                   <p>Tell us about your kitchen</p>
//                 </div>

//                 <div className={styles.formGrid}>
//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faStore} className={styles.inputIcon} />
//                       Kitchen Name *
//                     </label>
//                     <input
//                       type='text'
//                       name='kitchenName'
//                       placeholder='Your kitchen/brand name'
//                       value={formData.kitchenName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className={styles.formGroupFull}>
//                     <label>
//                       <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.inputIcon} />
//                       Kitchen Address *
//                     </label>
//                     <textarea
//                       name='address'
//                       placeholder='Complete address with landmarks'
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows='3'
//                       required
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.inputIcon} />
//                       Pincode *
//                     </label>
//                     <input
//                       type='text'
//                       name='pincode'
//                       placeholder='6-digit pincode'
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faUtensils} className={styles.inputIcon} />
//                       Cuisine Type *
//                     </label>
//                     <select
//                       name='cuisineType'
//                       value={formData.cuisineType}
//                       onChange={handleChange}
//                       required>
//                       <option value=''>Select cuisine type</option>
//                       <option value='north-indian'>North Indian</option>
//                       <option value='south-indian'>South Indian</option>
//                       <option value='chinese'>Chinese</option>
//                       <option value='continental'>Continental</option>
//                       <option value='multi-cuisine'>Multi Cuisine</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3 - Documents */}
//             {currentStep === 3 && (
//               <div className={styles.stepContent}>
//                 <div className={styles.stepHeader}>
//                   <h2>Documents & Banking</h2>
//                   <p>Provide your business and banking details</p>
//                 </div>

//                 <div className={styles.formGrid}>
//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faIdCard} className={styles.inputIcon} />
//                       FSSAI License Number *
//                     </label>
//                     <input
//                       type='text'
//                       name='fssai'
//                       placeholder='14-digit FSSAI number'
//                       value={formData.fssai}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faIdCard} className={styles.inputIcon} />
//                       PAN Card Number *
//                     </label>
//                     <input
//                       type='text'
//                       name='pan'
//                       placeholder='10-digit PAN number'
//                       value={formData.pan}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faIdCard} className={styles.inputIcon} />
//                       GST Number (Optional)
//                     </label>
//                     <input
//                       type='text'
//                       name='gst'
//                       placeholder='15-digit GST number'
//                       value={formData.gst}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faUniversity} className={styles.inputIcon} />
//                       Bank Account Number *
//                     </label>
//                     <input
//                       type='text'
//                       name='accountNumber'
//                       placeholder='Account number'
//                       value={formData.accountNumber}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faUniversity} className={styles.inputIcon} />
//                       IFSC Code *
//                     </label>
//                     <input
//                       type='text'
//                       name='ifsc'
//                       placeholder='Bank IFSC code'
//                       value={formData.ifsc}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 4 - Menu Upload */}
//             {currentStep === 4 && (
//               <div className={styles.stepContent}>
//                 <div className={styles.stepHeader}>
//                   <h2>Upload Your Menu</h2>
//                   <p>Share your menu items with us</p>
//                 </div>

//                 <div className={styles.uploadArea}>
//                   <FontAwesomeIcon icon={faFileUpload} className={styles.uploadIcon} />
//                   <h3>Upload Menu File</h3>
//                   <p>Supported formats: PDF, JPG, PNG (Max 5MB)</p>
//                   <input
//                     type='file'
//                     name='menuFile'
//                     accept='.pdf,.jpg,.jpeg,.png'
//                     onChange={handleChange}
//                     className={styles.fileInput}
//                     id='menuFile'
//                     required
//                   />
//                   <label htmlFor='menuFile' className={styles.uploadBtn}>
//                     <FontAwesomeIcon icon={faFileUpload} />
//                     Choose File
//                   </label>
//                   {formData.menuFile && (
//                     <p className={styles.fileName}>
//                       <FontAwesomeIcon icon={faCheckCircle} />
//                       {formData.menuFile.name}
//                     </p>
//                   )}
//                 </div>

//                 <div className={styles.infoBox}>
//                   <FontAwesomeIcon icon={faShieldAlt} />
//                   <div>
//                     <h4>Your information is safe</h4>
//                     <p>All documents are encrypted and reviewed by our team within 24 hours.</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             <div className={styles.formActions}>
//               {currentStep > 1 && (
//                 <button type='button' onClick={handlePrev} className={styles.btnSecondary}>
//                   <FontAwesomeIcon icon={faArrowLeft} />
//                   Previous
//                 </button>
//               )}

//               {currentStep < 4 ? (
//                 <button type='button' onClick={handleNext} className={styles.btnPrimary}>
//                   Next
//                   <FontAwesomeIcon icon={faArrowRight} />
//                 </button>
//               ) : (
//                 <button type='submit' className={styles.btnPrimary}>
//                   <FontAwesomeIcon icon={faCheckCircle} />
//                   Submit Application
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStore,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faIdCard,
  faUniversity,
  faFileUpload,
  faCheckCircle,
  faArrowRight,
  faArrowLeft,
  faUtensils,
  faClock,
  faShieldAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./PartnerRegister.module.css";

export default function PartnerRegister({ onRegisterSuccess, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    fullName: "",
    mobile: "",
    email: "",

    // Step 2 - Kitchen Info
    kitchenName: "",
    address: "",
    pincode: "",
    cuisineType: "",

    // Step 3 - Documents
    fssai: "",
    pan: "",
    gst: "",
    accountNumber: "",
    ifsc: "",

    // Step 4 - Menu
    menuFile: null,
  });

  const steps = [
    { number: 1, title: "Personal Info", icon: faUser },
    { number: 2, title: "Kitchen Details", icon: faStore },
    { number: 3, title: "Documents", icon: faIdCard },
    { number: 4, title: "Menu Upload", icon: faUtensils },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    // Show success modal
    setShowSuccessModal(true);

    // Mark as logged in if callback provided
    if (onRegisterSuccess) {
      onRegisterSuccess();
    }

    // Navigate to dashboard after 3 seconds
    setTimeout(() => {
      navigate("/partner/dashboard");
    }, 3000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/partner/dashboard");
  };

  return (
    <div className={styles.page}>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className={styles.modalIcon}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h2 className={styles.modalTitle}>Registration Successful! 🎉</h2>
            <p className={styles.modalText}>
              Thank you for registering with <strong>Raavito</strong>! We'll review your application
              and get back to you within 24 hours.
            </p>
            <p className={styles.modalSubtext}>Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <img src='/images/raavitologo.png' alt='Raavito' className={styles.logo} />
          <h2>Partner Registration</h2>
          <div className={styles.headerRight}>
            <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
            <span>Takes ~5 minutes</span>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {/* Progress Steps */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressSteps}>
            {steps.map((step, index) => (
              <div key={index} className={styles.progressItem}>
                <div
                  className={`${styles.progressCircle} ${
                    currentStep > step.number
                      ? styles.completed
                      : currentStep === step.number
                        ? styles.active
                        : ""
                  }`}>
                  {currentStep > step.number ? (
                    <FontAwesomeIcon icon={faCheckCircle} />
                  ) : (
                    <FontAwesomeIcon icon={step.icon} />
                  )}
                </div>
                <span className={styles.progressLabel}>{step.title}</span>
                {index < steps.length - 1 && (
                  <div
                    className={`${styles.progressLine} ${currentStep > step.number ? styles.completed : ""}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <h2>Personal Information</h2>
                  <p>Tell us about yourself</p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
                      Full Name *
                    </label>
                    <input
                      type='text'
                      name='fullName'
                      placeholder='Enter your full name'
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faPhone} className={styles.inputIcon} />
                      Mobile Number *
                    </label>
                    <input
                      type='tel'
                      name='mobile'
                      placeholder='10-digit mobile number'
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                      Email Address *
                    </label>
                    <input
                      type='email'
                      name='email'
                      placeholder='your.email@example.com'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - Kitchen Info */}
            {currentStep === 2 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <h2>Kitchen Details</h2>
                  <p>Tell us about your kitchen</p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faStore} className={styles.inputIcon} />
                      Kitchen Name *
                    </label>
                    <input
                      type='text'
                      name='kitchenName'
                      placeholder='Your kitchen/brand name'
                      value={formData.kitchenName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.inputIcon} />
                      Kitchen Address *
                    </label>
                    <textarea
                      name='address'
                      placeholder='Complete address with landmarks'
                      value={formData.address}
                      onChange={handleChange}
                      rows='3'
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.inputIcon} />
                      Pincode *
                    </label>
                    <input
                      type='text'
                      name='pincode'
                      placeholder='6-digit pincode'
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faUtensils} className={styles.inputIcon} />
                      Cuisine Type *
                    </label>
                    <select
                      name='cuisineType'
                      value={formData.cuisineType}
                      onChange={handleChange}
                      required>
                      <option value=''>Select cuisine type</option>
                      <option value='north-indian'>North Indian</option>
                      <option value='south-indian'>South Indian</option>
                      <option value='chinese'>Chinese</option>
                      <option value='continental'>Continental</option>
                      <option value='multi-cuisine'>Multi Cuisine</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Documents */}
            {currentStep === 3 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <h2>Documents & Banking</h2>
                  <p>Provide your business and banking details</p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faIdCard} className={styles.inputIcon} />
                      FSSAI License Number *
                    </label>
                    <input
                      type='text'
                      name='fssai'
                      placeholder='14-digit FSSAI number'
                      value={formData.fssai}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faIdCard} className={styles.inputIcon} />
                      PAN Card Number *
                    </label>
                    <input
                      type='text'
                      name='pan'
                      placeholder='10-digit PAN number'
                      value={formData.pan}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faIdCard} className={styles.inputIcon} />
                      GST Number (Optional)
                    </label>
                    <input
                      type='text'
                      name='gst'
                      placeholder='15-digit GST number'
                      value={formData.gst}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faUniversity} className={styles.inputIcon} />
                      Bank Account Number *
                    </label>
                    <input
                      type='text'
                      name='accountNumber'
                      placeholder='Account number'
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faUniversity} className={styles.inputIcon} />
                      IFSC Code *
                    </label>
                    <input
                      type='text'
                      name='ifsc'
                      placeholder='Bank IFSC code'
                      value={formData.ifsc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 - Menu Upload */}
            {currentStep === 4 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <h2>Upload Your Menu</h2>
                  <p>Share your menu items with us</p>
                </div>

                <div className={styles.uploadArea}>
                  <FontAwesomeIcon icon={faFileUpload} className={styles.uploadIcon} />
                  <h3>Upload Menu File</h3>
                  <p>Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                  <input
                    type='file'
                    name='menuFile'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={handleChange}
                    className={styles.fileInput}
                    id='menuFile'
                    required
                  />
                  <label htmlFor='menuFile' className={styles.uploadBtn}>
                    <FontAwesomeIcon icon={faFileUpload} />
                    Choose File
                  </label>
                  {formData.menuFile && (
                    <p className={styles.fileName}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      {formData.menuFile.name}
                    </p>
                  )}
                </div>

                <div className={styles.infoBox}>
                  <FontAwesomeIcon icon={faShieldAlt} />
                  <div>
                    <h4>Your information is safe</h4>
                    <p>All documents are encrypted and reviewed by our team within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className={styles.formActions}>
              {currentStep > 1 && (
                <button type='button' onClick={handlePrev} className={styles.btnSecondary}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button type='button' onClick={handleNext} className={styles.btnPrimary}>
                  Next
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              ) : (
                <button type='submit' className={styles.btnPrimary}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
