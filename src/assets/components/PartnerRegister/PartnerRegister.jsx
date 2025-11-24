import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../utils/api";
import {
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
  faClock,
  faEnvelope,
  faExclamationTriangle,
  faFileUpload,
  faIdCard,
  faInfoCircle,
  faMapMarkerAlt,
  faPhone,
  faShieldAlt,
  faSpinner,
  faStore,
  faTimes,
  faTimesCircle,
  faUniversity,
  faUser,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PartnerRegister.module.css';

/**
 * Enhanced PartnerRegister with comprehensive notification system
 * Technical improvements and premium UX
 */

// Debounce utility
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function PartnerRegister({ onRegisterSuccess, setIsLoggedIn }) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    kitchenName: '',
    address: '',
    pincode: '',
    location: '',
    cuisineType: '',
    operatingHours: '',
    deliveryRadius: '',
    fssai: '',
    pan: '',
    gst: '',
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifsc: '',
    menuFile: null,
  });

  // Notification system state
  const [notifications, setNotifications] = useState([]);
  const notificationIdRef = useRef(0);

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  // OTP & verification state
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobileOtp, setMobileOtp] = useState(['', '', '', '', '', '']); // Pin-style 6 digits
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
  const [mobileOtpError, setMobileOtpError] = useState('');
  const [mobileCountdown, setMobileCountdown] = useState(0);

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState(['', '', '', '', '', '']); // Pin-style 6 digits
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const [emailOtpError, setEmailOtpError] = useState('');
  const [emailCountdown, setEmailCountdown] = useState(0);

  // Refs for OTP inputs
  const mobileOtpRefs = useRef([]);
  const emailOtpRefs = useRef([]);

  // Pincode -> locations
  const [locations, setLocations] = useState([]);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  // Refs for cleanup
  const timeoutRefs = useRef([]);
  const abortControllerRef = useRef(null);

  // Debounced pincode for API calls
  const debouncedPincode = useDebounce(formData.pincode, 500);

  const steps = [
    { number: 1, title: 'Personal Info', icon: faUser },
    { number: 2, title: 'Kitchen Details', icon: faStore },
    { number: 3, title: 'Documents', icon: faIdCard },
    { number: 4, title: 'Menu Upload', icon: faUtensils },
  ];

  // Cleanup function for timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  // Enhanced notification system with priority
  const showNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = ++notificationIdRef.current;
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      timestamp: new Date(),
    };

    setNotifications((prev) => {
      // Limit to max 5 notifications
      const updated = [...prev, notification];
      return updated.slice(-5);
    });

    // Auto remove notification after duration
    if (duration > 0) {
      const timeoutId = setTimeout(() => {
        removeNotification(id);
      }, duration);
      timeoutRefs.current.push(timeoutId);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  // Specific notification helpers
  const showSuccess = useCallback(
    (message) => showNotification(message, 'success'),
    [showNotification]
  );
  const showError = useCallback(
    (message) => showNotification(message, 'error', 7000),
    [showNotification]
  );
  const showWarning = useCallback(
    (message) => showNotification(message, 'warning'),
    [showNotification]
  );
  const showInfo = useCallback(
    (message) => showNotification(message, 'info', 4000),
    [showNotification]
  );

  // Load saved draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('raavito_partner_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
        showInfo("We've restored your previous registration progress.");
      }
    } catch (err) {
      console.error('Failed to load draft:', err);
    }
  }, [showInfo]);

  // Save draft to localStorage (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const dataToSave = { ...formData };
        delete dataToSave.menuFile; // Don't save file object
        localStorage.setItem('raavito_partner_draft', JSON.stringify(dataToSave));
      } catch (err) {
        console.error('Failed to save draft:', err);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Welcome message - only once
  useEffect(() => {
    const timer = setTimeout(() => {
      showInfo(
        "Welcome to Raavito Partner Registration! Let's get your kitchen listed in just 5 minutes."
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [showInfo]);

  // Countdown timers for OTP resend
  useEffect(() => {
    if (mobileCountdown > 0) {
      const timer = setTimeout(() => setMobileCountdown(mobileCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [mobileCountdown]);

  useEffect(() => {
    if (emailCountdown > 0) {
      const timer = setTimeout(() => setEmailCountdown(emailCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailCountdown]);

  // Pincode location fetching with debounce
  useEffect(() => {
    const pin = debouncedPincode?.trim();
    if (pin && pin.length === 6 && /^\d{6}$/.test(pin)) {
      fetchLocationsByPincode(pin);
    } else {
      setLocations([]);
      setPincodeError('');
      setFormData((f) => ({ ...f, location: '' }));
    }
  }, [debouncedPincode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [clearAllTimeouts]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };
      
      // Auto-split fullName into firstName and lastName
      if (name === "fullName" && value) {
        const parts = value.trim().split(" ");
        updated.firstName = parts[0] || "";
        updated.lastName = parts.slice(1).join(" ") || "";
      }
      
      return updated;
    });

    // Clear error for this field
    setFormErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });

    // File validation
    if (files && files[0]) {
      const file = files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

      if (file.size > maxSize) {
        showError('File size must be less than 5MB. Please choose a smaller file.');
        e.target.value = '';
        setFormData((prev) => ({ ...prev, [name]: null }));
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        showError('Please upload only PDF, JPG, or PNG files for your menu.');
        e.target.value = '';
        setFormData((prev) => ({ ...prev, [name]: null }));
        return;
      }

      showSuccess(`Menu file "${file.name}" uploaded successfully!`);
    }

    // Contextual guidance
    if (name === 'mobile' && newValue.length === 10 && /^\d{10}$/.test(newValue)) {
      showInfo("Great! Now click 'Send OTP' to verify your mobile number.");
    }
  };

  // OTP Pin-style handlers
  const handleOtpChange = (type, index, value) => {
    if (value && !/^\d$/.test(value)) return; // Only digits

    const setOtp = type === 'mobile' ? setMobileOtp : setEmailOtp;
    const otp = type === 'mobile' ? mobileOtp : emailOtp;
    const refs = type === 'mobile' ? mobileOtpRefs : emailOtpRefs;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (type === 'mobile') {
      setMobileOtpError('');
    } else {
      setEmailOtpError('');
    }

    // Auto-advance
    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 filled
    if (newOtp.every((d) => d !== '') && index === 5) {
      setTimeout(() => verifyOtp(type, newOtp.join('')), 300);
    }
  };

  const handleOtpKeyDown = (type, index, e) => {
    const otp = type === 'mobile' ? mobileOtp : emailOtp;
    const refs = type === 'mobile' ? mobileOtpRefs : emailOtpRefs;

    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        refs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (type, e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      if (type === 'mobile') {
        setMobileOtp(newOtp);
        setMobileOtpError('');
        mobileOtpRefs.current[5]?.focus();
      } else {
        setEmailOtp(newOtp);
        setEmailOtpError('');
        emailOtpRefs.current[5]?.focus();
      }
      setTimeout(() => verifyOtp(type, pastedData), 300);
      showInfo('OTP pasted! Verifying...');
    } else {
      showError('Please paste a valid 6-digit OTP');
    }
  };

  // OTP functions with proper cleanup - Integrated with backend API
  const sendOtp = useCallback(
    async (type) => {
      const value = type === 'mobile' ? formData.mobile : formData.email;

      if (!value) {
        if (type === 'mobile') {
          showError('Please enter your mobile number first');
          setMobileOtpError('Enter mobile first');
        } else {
          showError('Please enter your email address first');
          setEmailOtpError('Enter email first');
        }
        return;
      }

      // Validate format
      if (type === 'mobile' && !/^\d{10}$/.test(value)) {
        showError('Please enter a valid 10-digit mobile number');
        return;
      }

      if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError('Please enter a valid email address');
        return;
      }

      try {
        if (type === 'mobile') {
          setMobileOtpLoading(true);
          setMobileOtpError('');
          showInfo(`Sending OTP to ${value}...`);
        } else {
          setEmailOtpLoading(true);
          setEmailOtpError('');
          showInfo(`Sending OTP to ${value}...`);
        }

        // Get API base URL from api instance
        const apiBaseURL = api.defaults.baseURL || (import.meta.env.VITE_API_URL || 'http://localhost:5050/api');
        
        // Call backend OTP API
        const response = await fetch(`${apiBaseURL}/otp/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, value }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send OTP");
        }

        if (type === "mobile") {
          setMobileOtpSent(true);
          setMobileOtpLoading(false);
          setMobileCountdown(30); // 30 second countdown
          setMobileOtp(['', '', '', '', '', '']);
          setTimeout(() => mobileOtpRefs.current[0]?.focus(), 100);
          showSuccess(`OTP sent to ${value}!${data.otp ? ` Use: ${data.otp} for testing` : ''}`);
        } else {
          setEmailOtpSent(true);
          setEmailOtpLoading(false);
          setEmailCountdown(30); // 30 second countdown
          setEmailOtp(['', '', '', '', '', '']);
          setTimeout(() => emailOtpRefs.current[0]?.focus(), 100);
          showSuccess(`OTP sent to ${value}!${data.otp ? ` Use: ${data.otp} for testing` : ''}`);
        }
      } catch (err) {
        const errorMsg = err.message || 'Failed to send OTP';
        if (type === 'mobile') {
          setMobileOtpError(errorMsg);
          showError(`Failed to send OTP to mobile: ${errorMsg}`);
          setMobileOtpLoading(false);
        } else {
          setEmailOtpError(errorMsg);
          showError(`Failed to send OTP to email: ${errorMsg}`);
          setEmailOtpLoading(false);
        }
      }
    },
    [formData.mobile, formData.email, showError, showInfo, showSuccess]
  );

  const verifyOtp = useCallback(
    async (type, otpValue = null) => {
      const otp = type === 'mobile' ? mobileOtp : emailOtp;
      const otpString = otpValue || otp.join('');
      const value = type === 'mobile' ? formData.mobile : formData.email;

      if (!otpString || otpString.length !== 6) {
        if (type === 'mobile') {
          showError('Please enter all 6 digits');
          setMobileOtpError('Enter complete OTP');
        } else {
          showError('Please enter all 6 digits');
          setEmailOtpError('Enter complete OTP');
        }
        return;
      }

      try {
        if (type === 'mobile') {
          setMobileOtpLoading(true);
          setMobileOtpError('');
          showInfo('Verifying OTP...');
        } else {
          setEmailOtpLoading(true);
          setEmailOtpError('');
          showInfo('Verifying OTP...');
        }

        // Get API base URL from api instance
        const apiBaseURL = api.defaults.baseURL || (import.meta.env.VITE_API_URL || 'http://localhost:5050/api');
        
        // Call backend OTP verification API
        const response = await fetch(`${apiBaseURL}/otp/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, value, otp: otpString }),
        });

        const data = await response.json();

        if (!response.ok || !data.message || data.message !== "OTP verified successfully") {
          throw new Error(data.message || "Invalid or expired OTP");
        }

        if (type === "mobile") {
          setMobileVerified(true);
          setMobileOtpError("");
          showSuccess("🎉 Mobile number verified successfully!");
        } else {
          setEmailVerified(true);
          setEmailOtpError("");
          showSuccess("🎉 Email address verified successfully!");
        const FIXED_OTP = '123456';

        if (otpString === FIXED_OTP) {
          if (type === 'mobile') {
            setMobileVerified(true);
            setMobileOtpError('');
            showSuccess('🎉 Mobile number verified successfully!');
          } else {
            setEmailVerified(true);
            setEmailOtpError('');
            showSuccess('🎉 Email address verified successfully!');
          }
        } else {
          throw new Error('Incorrect OTP. Use: 123456');
        }
      } catch (err) {
        const errorMsg = err.message || 'OTP verification failed';
        if (type === 'mobile') {
          setMobileOtpError(errorMsg);
          setMobileOtp(['', '', '', '', '', '']);
          setTimeout(() => mobileOtpRefs.current[0]?.focus(), 100);
          showError(errorMsg);
        } else {
          setEmailOtpError(errorMsg);
          setEmailOtp(['', '', '', '', '', '']);
          setTimeout(() => emailOtpRefs.current[0]?.focus(), 100);
          showError(errorMsg);
        }
      } finally {
        if (type === 'mobile') setMobileOtpLoading(false);
        else setEmailOtpLoading(false);
      }
    },
    [mobileOtp, emailOtp, formData.mobile, formData.email, showError, showInfo, showSuccess]
  );

  const fetchLocationsByPincode = useCallback(
    async (pincode) => {
      // Abort previous request if any
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setPincodeLoading(true);
      setPincodeError('');
      setLocations([]);
      setFormData((f) => ({ ...f, location: '' }));

      showInfo('Loading localities for your pincode...');

      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
          signal: abortControllerRef.current.signal,
        });

        if (!res.ok) throw new Error('Failed to fetch pincode data');

        const json = await res.json();
        if (!Array.isArray(json) || json.length === 0) throw new Error('No data for pincode');

        const first = json[0];
        if (
          first.Status !== 'Success' ||
          !Array.isArray(first.PostOffice) ||
          first.PostOffice.length === 0
        ) {
          throw new Error('No locations found for this pincode');
        }

        const locationNames = first.PostOffice.map((p) => `${p.Name} (${p.Division})`);
        setLocations(locationNames);
        showSuccess(
          `Found ${locationNames.length} localities for pincode ${pincode}. Please select your location.`
        );
      } catch (err) {
        if (err.name === 'AbortError') return; // Ignore aborted requests

        const errorMsg = err.message || 'Unable to load locations';
        setPincodeError(errorMsg);
        showError(
          `Could not load localities: ${errorMsg}. Please check your pincode and try again.`
        );
      } finally {
        setPincodeLoading(false);
      }
    },
    [showInfo, showSuccess, showError]
  );

  const validateCurrentStep = useCallback(() => {
    const errors = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        errors.fullName = 'Full name is required';
        showError('Please enter your full name');
        return false;
      }
      if (formData.fullName.trim().length < 2) {
        errors.fullName = 'Name must be at least 2 characters';
        showError('Please enter a valid full name');
        return false;
      }
      if (!formData.mobile.trim()) {
        errors.mobile = 'Mobile number is required';
        showError('Please enter your mobile number');
        return false;
      }
      if (!/^\d{10}$/.test(formData.mobile)) {
        errors.mobile = 'Invalid mobile number';
        showError('Please enter a valid 10-digit mobile number');
        return false;
      }
      if (!mobileVerified) {
        showError('Please verify your mobile number before proceeding');
        return false;
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Invalid email';
        showError('Please enter a valid email address');
        return false;
      }
      if (formData.email && !emailVerified) {
        showError('Please verify your email address or remove it to continue');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.kitchenName?.trim() || formData.kitchenName.trim().length < 3) {
        errors.kitchenName = 'Kitchen name required (min 3 characters)';
        showError('Please enter a valid kitchen name (at least 3 characters)');
        return false;
      }
      if (!formData.address?.trim() || formData.address.trim().length < 10) {
        errors.address = 'Complete address required';
        showError('Please provide a complete address with landmarks');
        return false;
      }
      if (!formData.pincode?.trim() || !/^\d{6}$/.test(formData.pincode)) {
        errors.pincode = 'Valid 6-digit pincode required';
        showError('Please enter a valid 6-digit pincode');
        return false;
      }
      if (!formData.location?.trim()) {
        errors.location = 'Location required';
        showError('Please select your location from the dropdown');
        return false;
      }
      if (!formData.cuisineType?.trim()) {
        errors.cuisineType = 'Cuisine type required';
        showError('Please select your cuisine type');
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.fssai?.trim() || !/^\d{14}$/.test(formData.fssai)) {
        errors.fssai = 'Valid 14-digit FSSAI required';
        showError('Please enter a valid 14-digit FSSAI license number');
        return false;
      }
      if (!formData.pan?.trim() || !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
        errors.pan = 'Valid PAN required';
        showError('Please enter a valid PAN number (e.g., ABCDE1234F)');
        return false;
      }
      if (
        formData.gst &&
        !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(formData.gst.toUpperCase())
      ) {
        errors.gst = 'Invalid GST format';
        showError('Please enter a valid 15-digit GST number');
        return false;
      }
      if (!formData.bankName?.trim()) {
        errors.bankName = 'Bank name required';
        showError('Please enter your bank name');
        return false;
      }
      if (!formData.accountNumber?.trim() || !/^\d{9,18}$/.test(formData.accountNumber)) {
        errors.accountNumber = 'Valid account number required';
        showError('Please enter a valid bank account number (9-18 digits)');
        return false;
      }
      if (!formData.ifsc?.trim() || !/^[A-Z]{4}\d{7}$/.test(formData.ifsc.toUpperCase())) {
        errors.ifsc = 'Valid IFSC required';
        showError('Please enter a valid IFSC code (e.g., ABCD0123456)');
        return false;
      }
    } else if (currentStep === 4) {
      if (!formData.menuFile) {
        showError('Please upload your menu file to complete registration');
        return false;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentStep, formData, mobileVerified, emailVerified, showError]);

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return;

    setCurrentStep((s) => s + 1);

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Step-specific guidance
    if (currentStep === 1) {
      showInfo("Great! Now let's add your kitchen details and location information.");
    } else if (currentStep === 2) {
      showInfo(
        'Perfect! Now we need your business documents and banking information for payments.'
      );
    } else if (currentStep === 3) {
      showInfo(
        'Almost done! Please upload your menu so customers can see your delicious offerings.'
      );
    }
  }, [validateCurrentStep, currentStep, showInfo]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showInfo(
        `Moved back to ${steps[currentStep - 2].title}. You can edit your information here.`
      );
    }
  }, [currentStep, showInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    showInfo('Submitting your registration application...');

    try {
      // Simulate API delay
      await new Promise((resolve) => {
        const timeoutId = setTimeout(resolve, 2000);
        timeoutRefs.current.push(timeoutId);
      });

      // Clear saved draft
      localStorage.removeItem('raavito_partner_draft');

      showSuccess('🎉 Registration submitted successfully! Welcome to Raavito family!');
      setShowSuccessModal(true);
      setIsLoggedIn?.(true);
      onRegisterSuccess?.();

      // Navigate after delay
      const timeoutId = setTimeout(() => navigate('/partner/dashboard'), 2500);
      timeoutRefs.current.push(timeoutId);
    } catch (err) {
      showError(
        `Registration failed: ${err.message || 'Something went wrong'}. Please try again or contact support.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/partner/dashboard');
  };

  // Render notifications
  const renderNotifications = () => {
    return (
      <div className={styles.notificationsContainer} role='region' aria-label='Notifications'>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${styles.notification} ${styles[`notification-${notification.type}`]}`}
            onClick={() => removeNotification(notification.id)}
            role='alert'
            aria-live='polite'
          >
            <div className={styles.notificationIcon} aria-hidden='true'>
              {notification.type === 'success' && <FontAwesomeIcon icon={faCheckCircle} />}
              {notification.type === 'error' && <FontAwesomeIcon icon={faTimesCircle} />}
              {notification.type === 'warning' && <FontAwesomeIcon icon={faExclamationTriangle} />}
              {notification.type === 'info' && <FontAwesomeIcon icon={faInfoCircle} />}
            </div>
            <div className={styles.notificationContent}>
              <div className={styles.notificationMessage}>{notification.message}</div>
              <div className={styles.notificationTime}>
                {notification.timestamp.toLocaleTimeString()}
              </div>
            </div>
            <button
              className={styles.notificationClose}
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              aria-label='Close notification'
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.page}>
      {showSuccessModal && (
        <div
          className={styles.modalOverlay}
          onClick={handleCloseModal}
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-title'
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={handleCloseModal}
              aria-label='Close modal'
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className={styles.modalIcon} aria-hidden='true'>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h2 id='modal-title' className={styles.modalTitle}>
              Registration Successful
            </h2>
            <p className={styles.modalText}>
              Thank you for registering with <strong>Raavito</strong>. We'll review your application
              within 24 hours and get back to you.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.btnPrimary} onClick={handleCloseModal}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <img src='/images/raavitologo.png' alt='Raavito Logo' className={styles.logo} />
          <h2>Partner Registration</h2>
          <div className={styles.headerRight}>
            <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
            <span>Takes ~5 minutes</span>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.progressWrapper}>
          <div
            className={styles.progressSteps}
            role='progressbar'
            aria-valuenow={currentStep}
            aria-valuemin='1'
            aria-valuemax='4'
          >
            {steps.map((step, index) => (
              <div key={index} className={styles.progressItem}>
                <div
                  className={`${styles.progressCircle} ${
                    currentStep > step.number
                      ? styles.completed
                      : currentStep === step.number
                        ? styles.active
                        : ''
                  }`}
                  aria-label={`Step ${step.number}: ${step.title}`}
                >
                  {currentStep > step.number ? (
                    <FontAwesomeIcon icon={faCheckCircle} />
                  ) : (
                    <FontAwesomeIcon icon={step.icon} />
                  )}
                </div>
                <span className={styles.progressLabel}>{step.title}</span>
                {index < steps.length - 1 && (
                  <div
                    className={`${styles.progressLine} ${currentStep > step.number ? styles.completed : ''}`}
                    aria-hidden='true'
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} noValidate>
            {/* STEP 1 - Personal */}
            {currentStep === 1 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <h2>Personal Information</h2>
                  <p>Verify your mobile and email to continue</p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor='fullName'>
                      <FontAwesomeIcon
                        icon={faUser}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Full Name *
                    </label>
                    <input
                      id='fullName'
                      type='text'
                      name='fullName'
                      placeholder='Enter your full name'
                      value={formData.fullName}
                      onChange={handleChange}
                      className={formErrors.fullName ? styles.errorInput : ''}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.fullName}
                      aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                    />
                    {formErrors.fullName && (
                      <span id='fullName-error' className={styles.fieldError} role='alert'>
                        {formErrors.fullName}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='mobile'>
                      <FontAwesomeIcon
                        icon={faPhone}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Mobile Number *
                    </label>
                    <input
                      id='mobile'
                      type='tel'
                      name='mobile'
                      placeholder='10-digit mobile number'
                      value={formData.mobile}
                      onChange={(e) => {
                        setMobileVerified(false);
                        setMobileOtpSent(false);
                        setMobileOtp(['', '', '', '', '', '']);
                        setMobileOtpError('');
                        handleChange(e);
                      }}
                      className={formErrors.mobile ? styles.errorInput : ''}
                      required
                      pattern='\d{10}'
                      maxLength='10'
                      aria-required='true'
                      aria-invalid={!!formErrors.mobile}
                      aria-describedby={formErrors.mobile ? 'mobile-error' : undefined}
                    />
                    {formErrors.mobile && (
                      <span id='mobile-error' className={styles.fieldError} role='alert'>
                        {formErrors.mobile}
                      </span>
                    )}
                    <div className={styles.otpButtonSection}>
                      {!mobileVerified ? (
                        <>
                          <button
                            type='button'
                            className={styles.smallBtn}
                            onClick={() => sendOtp('mobile')}
                            disabled={
                              mobileOtpLoading ||
                              !formData.mobile ||
                              formErrors.mobile ||
                              mobileCountdown > 0
                            }
                            aria-busy={mobileOtpLoading}
                          >
                            {mobileOtpLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                            {mobileOtpLoading
                              ? 'Sending...'
                              : mobileOtpSent
                                ? 'Resend OTP'
                                : 'Send OTP'}
                          </button>
                          {mobileOtpSent && mobileCountdown > 0 && (
                            <span className={styles.countdownBadge}>
                              <FontAwesomeIcon icon={faClock} /> {mobileCountdown}s
                            </span>
                          )}
                        </>
                      ) : (
                        <span className={styles.verifiedBadge}>
                          <FontAwesomeIcon icon={faCheckCircle} /> Mobile verified
                        </span>
                      )}
                    </div>
                    {mobileOtpSent && !mobileVerified && (
                      <div className={styles.otpPinSection}>
                        <div className={styles.otpPinInputs}>
                          {mobileOtp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (mobileOtpRefs.current[index] = el)}
                              type='text'
                              inputMode='numeric'
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange('mobile', index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown('mobile', index, e)}
                              onPaste={index === 0 ? (e) => handleOtpPaste('mobile', e) : undefined}
                              className={`${styles.otpPinInput} ${mobileOtpError ? styles.errorOtp : ''} ${
                                digit ? styles.filledOtp : ''
                              }`}
                              disabled={mobileOtpLoading}
                              aria-label={`Digit ${index + 1}`}
                              autoComplete='off'
                            />
                          ))}
                        </div>
                        {mobileOtpError && (
                          <div className={styles.errorText} role='alert'>
                            {mobileOtpError}
                          </div>
                        )}
                        <button
                          type='button'
                          className={styles.verifyBtn}
                          onClick={() => verifyOtp('mobile')}
                          disabled={mobileOtpLoading || mobileOtp.some((d) => !d)}
                          aria-busy={mobileOtpLoading}
                        >
                          {mobileOtpLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                          {mobileOtpLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup} style={{ opacity: mobileVerified ? 1 : 0.6 }}>
                    <label htmlFor='email'>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Email Address {mobileVerified ? '*' : '(Verify mobile first)'}
                    </label>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      placeholder='your.email@example.com'
                      value={formData.email}
                      onChange={(e) => {
                        setEmailOtpSent(false);
                        setEmailVerified(false);
                        setEmailOtp(['', '', '', '', '', '']);
                        setEmailOtpError('');
                        handleChange(e);
                      }}
                      className={formErrors.email ? styles.errorInput : ''}
                      required={mobileVerified}
                      disabled={!mobileVerified}
                      aria-required={mobileVerified}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {formErrors.email && (
                      <span id='email-error' className={styles.fieldError} role='alert'>
                        {formErrors.email}
                      </span>
                    )}
                    <div className={styles.otpButtonSection}>
                      {mobileVerified && !emailVerified && formData.email && (
                        <>
                          <button
                            type='button'
                            className={styles.smallBtn}
                            onClick={() => sendOtp('email')}
                            disabled={
                              emailOtpLoading ||
                              !formData.email ||
                              formErrors.email ||
                              emailCountdown > 0
                            }
                            aria-busy={emailOtpLoading}
                          >
                            {emailOtpLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                            {emailOtpLoading
                              ? 'Sending...'
                              : emailOtpSent
                                ? 'Resend OTP'
                                : 'Send OTP'}
                          </button>
                          {emailOtpSent && emailCountdown > 0 && (
                            <span className={styles.countdownBadge}>
                              <FontAwesomeIcon icon={faClock} /> {emailCountdown}s
                            </span>
                          )}
                        </>
                      )}
                      {emailVerified && (
                        <span className={styles.verifiedBadge}>
                          <FontAwesomeIcon icon={faCheckCircle} /> Email verified
                        </span>
                      )}
                    </div>
                    {emailOtpSent && !emailVerified && (
                      <div className={styles.otpPinSection}>
                        <div className={styles.otpPinInputs}>
                          {emailOtp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (emailOtpRefs.current[index] = el)}
                              type='text'
                              inputMode='numeric'
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange('email', index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown('email', index, e)}
                              onPaste={index === 0 ? (e) => handleOtpPaste('email', e) : undefined}
                              className={`${styles.otpPinInput} ${emailOtpError ? styles.errorOtp : ''} ${
                                digit ? styles.filledOtp : ''
                              }`}
                              disabled={emailOtpLoading}
                              aria-label={`Digit ${index + 1}`}
                              autoComplete='off'
                            />
                          ))}
                        </div>
                        {emailOtpError && (
                          <div className={styles.errorText} role='alert'>
                            {emailOtpError}
                          </div>
                        )}
                        <button
                          type='button'
                          className={styles.verifyBtn}
                          onClick={() => verifyOtp('email')}
                          disabled={emailOtpLoading || emailOtp.some((d) => !d)}
                          aria-busy={emailOtpLoading}
                        >
                          {emailOtpLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                          {emailOtpLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 - Kitchen */}
            {currentStep === 2 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <h2>Kitchen Details</h2>
                  <p>Enter kitchen address and pincode to pick locality</p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor='kitchenName'>
                      <FontAwesomeIcon
                        icon={faStore}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Kitchen Name *
                    </label>
                    <input
                      id='kitchenName'
                      type='text'
                      name='kitchenName'
                      placeholder='Your kitchen/restaurant name'
                      value={formData.kitchenName}
                      onChange={handleChange}
                      className={formErrors.kitchenName ? styles.errorInput : ''}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.kitchenName}
                    />
                    {formErrors.kitchenName && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.kitchenName}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroupFull}>
                    <label htmlFor='address'>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Kitchen Address *
                    </label>
                    <textarea
                      id='address'
                      name='address'
                      placeholder='Complete address with landmarks'
                      value={formData.address}
                      onChange={handleChange}
                      rows='3'
                      className={formErrors.address ? styles.errorInput : ''}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.address}
                    />
                    {formErrors.address && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.address}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='pincode'>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Pincode *
                    </label>
                    <input
                      id='pincode'
                      type='text'
                      name='pincode'
                      placeholder='6-digit pincode'
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength={6}
                      className={formErrors.pincode ? styles.errorInput : ''}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.pincode}
                      aria-busy={pincodeLoading}
                    />
                    {pincodeLoading && (
                      <div className={styles.loadingIndicator}>
                        <FontAwesomeIcon icon={faSpinner} spin /> Loading locations...
                      </div>
                    )}
                    {pincodeError && (
                      <div className={styles.errorText} role='alert'>
                        {pincodeError}
                      </div>
                    )}
                    {formErrors.pincode && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.pincode}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='location'>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Locality / Location *
                    </label>
                    <select
                      id='location'
                      name='location'
                      value={formData.location}
                      onChange={handleChange}
                      className={formErrors.location ? styles.errorInput : ''}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.location}
                    >
                      <option value=''>
                        {locations.length ? 'Select locality' : 'Enter valid pincode to load'}
                      </option>
                      {locations.map((loc, i) => (
                        <option key={i} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    {formErrors.location && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.location}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='cuisineType'>
                      <FontAwesomeIcon
                        icon={faUtensils}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Cuisine Type *
                    </label>
                    <select
                      id='cuisineType'
                      name='cuisineType'
                      value={formData.cuisineType}
                      onChange={handleChange}
                      className={formErrors.cuisineType ? styles.errorInput : ''}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.cuisineType}
                    >
                      <option value=''>Select cuisine type</option>
                      <option value='North Indian'>North Indian</option>
                      <option value='South Indian'>South Indian</option>
                      <option value='Gujarati'>Gujarati</option>
                      <option value='Rajasthani'>Rajasthani</option>
                      <option value='Punjabi'>Punjabi</option>
                      <option value='Chinese'>Chinese</option>
                      <option value='Continental'>Continental</option>
                      <option value='Multi Cuisine'>Multi Cuisine</option>
                    </select>
                    {formErrors.cuisineType && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.cuisineType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 - Documents & Banking */}
            {currentStep === 3 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <h2>Documents & Banking</h2>
                  <p>Provide business and bank details for payments</p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor='fssai'>
                      <FontAwesomeIcon
                        icon={faIdCard}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      FSSAI License Number *
                      <small style={{ marginLeft: 8 }}>
                        <a
                          href='https://foodlicensing.fssai.gov.in/'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Apply here for FSSAI
                        </a>
                      </small>
                    </label>
                    <input
                      id='fssai'
                      type='text'
                      name='fssai'
                      placeholder='14-digit FSSAI number'
                      value={formData.fssai}
                      onChange={handleChange}
                      className={formErrors.fssai ? styles.errorInput : ''}
                      maxLength='14'
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.fssai}
                    />
                    {formErrors.fssai && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.fssai}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='pan'>
                      <FontAwesomeIcon
                        icon={faIdCard}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      PAN Card Number *
                    </label>
                    <input
                      id='pan'
                      type='text'
                      name='pan'
                      placeholder='10-character PAN'
                      value={formData.pan}
                      onChange={handleChange}
                      className={formErrors.pan ? styles.errorInput : ''}
                      maxLength='10'
                      style={{ textTransform: 'uppercase' }}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.pan}
                    />
                    {formErrors.pan && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.pan}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='gst'>
                      <FontAwesomeIcon
                        icon={faIdCard}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      GST Number (Optional)
                      <small style={{ marginLeft: 8 }}>
                        <a href='https://www.gst.gov.in/' target='_blank' rel='noreferrer'>
                          Apply here for GST
                        </a>
                      </small>
                    </label>
                    <input
                      id='gst'
                      type='text'
                      name='gst'
                      placeholder='15-digit GST number'
                      value={formData.gst}
                      onChange={handleChange}
                      className={formErrors.gst ? styles.errorInput : ''}
                      maxLength='15'
                      style={{ textTransform: 'uppercase' }}
                      aria-invalid={!!formErrors.gst}
                    />
                    {formErrors.gst && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.gst}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='bankName'>
                      <FontAwesomeIcon
                        icon={faUniversity}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Bank Name *
                    </label>
                    <input
                      id='bankName'
                      type='text'
                      name='bankName'
                      placeholder='Bank name'
                      value={formData.bankName}
                      onChange={handleChange}
                      className={formErrors.bankName ? styles.errorInput : ''}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.bankName}
                    />
                    {formErrors.bankName && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.bankName}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='accountNumber'>
                      <FontAwesomeIcon
                        icon={faUniversity}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      Bank Account Number *
                    </label>
                    <input
                      id='accountNumber'
                      type='text'
                      name='accountNumber'
                      placeholder='Account number'
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className={formErrors.accountNumber ? styles.errorInput : ''}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.accountNumber}
                    />
                    {formErrors.accountNumber && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.accountNumber}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='ifsc'>
                      <FontAwesomeIcon
                        icon={faUniversity}
                        className={styles.inputIcon}
                        aria-hidden='true'
                      />
                      IFSC Code *
                    </label>
                    <input
                      id='ifsc'
                      type='text'
                      name='ifsc'
                      placeholder='Bank IFSC code'
                      value={formData.ifsc}
                      onChange={handleChange}
                      className={formErrors.ifsc ? styles.errorInput : ''}
                      maxLength='11'
                      style={{ textTransform: 'uppercase' }}
                      required
                      aria-required='true'
                      aria-invalid={!!formErrors.ifsc}
                    />
                    {formErrors.ifsc && (
                      <span className={styles.fieldError} role='alert'>
                        {formErrors.ifsc}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 - Menu Upload */}
            {currentStep === 4 && (
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <h2>Upload Your Menu</h2>
                  <p>Share your menu items with us</p>
                </div>

                <div className={styles.uploadArea}>
                  <FontAwesomeIcon
                    icon={faFileUpload}
                    className={styles.uploadIcon}
                    aria-hidden='true'
                  />
                  <h3>Upload Menu File</h3>
                  <p>Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                  <input
                    type='file'
                    name='menuFile'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={handleChange}
                    className={styles.fileInput}
                    id='menuFile'
                    aria-required='false'
                  />
                  <label htmlFor='menuFile' className={styles.uploadBtn}>
                    <FontAwesomeIcon icon={faFileUpload} />
                    Choose File
                  </label>
                  {formData.menuFile && (
                    <p className={styles.fileName}>
                      <FontAwesomeIcon icon={faCheckCircle} /> {formData.menuFile.name}
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
                <button
                  type='button'
                  onClick={handlePrev}
                  className={styles.btnSecondary}
                  disabled={isSubmitting}
                >
                  <FontAwesomeIcon icon={faArrowLeft} /> Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type='button'
                  onClick={handleNext}
                  className={styles.btnPrimary}
                  disabled={isSubmitting}
                >
                  Next <FontAwesomeIcon icon={faArrowRight} />
                </button>
              ) : (
                <button
                  type='submit'
                  className={styles.btnPrimary}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting && <FontAwesomeIcon icon={faSpinner} spin />}
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} /> Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {renderNotifications()}
    </div>
  );
}
