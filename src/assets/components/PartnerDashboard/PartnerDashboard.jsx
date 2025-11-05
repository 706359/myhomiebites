// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faClipboardList,
//   faUtensils,
//   faChartLine,
//   faCog,
//   faSignOutAlt,
//   faBell,
//   faCheckCircle,
//   faClock,
//   faTruck,
//   faIndianRupeeSign,
//   faUsers,
//   faUser,
//   faEnvelope,
//   faPhone,
//   faMapMarkerAlt,
//   faEdit,
//   faSave,
//   faCamera,
// } from "@fortawesome/free-solid-svg-icons";
// import styles from "./PartnerDashboard.module.css";

// export default function PartnerDashboard() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "Ravi's Kitchen",
//     email: "ravi@example.com",
//     phone: "+91 98765 43210",
//     address: "A1-405, Panchsheel Greens 1, Noida Extension",
//     fssai: "12345678901234",
//     bankAccount: "XXXX XXXX 1234",
//   });

//   const stats = [
//     { icon: faClipboardList, label: "Today's Orders", value: "12", change: "+3", color: "orange" },
//     {
//       icon: faIndianRupeeSign,
//       label: "Today's Revenue",
//       value: "₹2,450",
//       change: "+15%",
//       color: "green",
//     },
//     { icon: faUsers, label: "Total Customers", value: "245", change: "+8", color: "blue" },
//     {
//       icon: faCheckCircle,
//       label: "Completed Orders",
//       value: "156",
//       change: "92%",
//       color: "purple",
//     },
//   ];

//   const recentOrders = [
//     {
//       id: "#1234",
//       customer: "Rahul Sharma",
//       items: "2x Dal Makhani, 3x Roti",
//       amount: "₹340",
//       status: "preparing",
//       time: "5 min ago",
//     },
//     {
//       id: "#1233",
//       customer: "Priya Singh",
//       items: "1x Paneer Butter Masala",
//       amount: "₹280",
//       status: "ready",
//       time: "12 min ago",
//     },
//     {
//       id: "#1232",
//       customer: "Amit Patel",
//       items: "2x Veg Biryani, 1x Raita",
//       amount: "₹520",
//       status: "delivered",
//       time: "45 min ago",
//     },
//     {
//       id: "#1231",
//       customer: "Neha Gupta",
//       items: "3x Chole Bhature",
//       amount: "₹180",
//       status: "delivered",
//       time: "1 hour ago",
//     },
//   ];

//   const menuItems = [
//     { name: "Dal Makhani", price: "₹180", category: "Main Course", status: "Available" },
//     { name: "Paneer Butter Masala", price: "₹220", category: "Main Course", status: "Available" },
//     { name: "Veg Biryani", price: "₹250", category: "Rice", status: "Available" },
//     { name: "Chole Bhature", price: "₹120", category: "Breakfast", status: "Out of Stock" },
//     { name: "Roti (3 pcs)", price: "₹30", category: "Bread", status: "Available" },
//   ];

//   const notifications = [
//     { text: "New order received from Rahul Sharma", time: "5 min ago", type: "order" },
//     { text: "Payment of ₹2,450 has been credited", time: "2 hours ago", type: "payment" },
//     { text: "Your menu has been approved", time: "1 day ago", type: "info" },
//   ];

//   const handleProfileUpdate = () => {
//     setIsEditing(false);
//     alert("Profile updated successfully!");
//   };

//   const handleLogout = () => {
//     if (confirm("Are you sure you want to logout?")) {
//       alert("Logged out successfully!");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "preparing":
//         return "orange";
//       case "ready":
//         return "blue";
//       case "delivered":
//         return "green";
//       default:
//         return "gray";
//     }
//   };

//   return (
//     <div className={styles.dashboard}>
//       {/* Sidebar */}
//       <aside className={styles.sidebar}>
//         <div className={styles.logo}>
//           <img src='/images/logo2.png' alt='Raavito' />
//           <p>Partner Dashboard</p>
//         </div>

//         <nav className={styles.nav}>
//           <button
//             className={`${styles.navItem} ${activeTab === "home" ? styles.active : ""}`}
//             onClick={() => setActiveTab("home")}>
//             <FontAwesomeIcon icon={faHome} />
//             <span>Dashboard</span>
//           </button>

//           <button
//             className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
//             onClick={() => setActiveTab("orders")}>
//             <FontAwesomeIcon icon={faClipboardList} />
//             <span>Orders</span>
//           </button>

//           <button
//             className={`${styles.navItem} ${activeTab === "menu" ? styles.active : ""}`}
//             onClick={() => setActiveTab("menu")}>
//             <FontAwesomeIcon icon={faUtensils} />
//             <span>Menu</span>
//           </button>

//           <button
//             className={`${styles.navItem} ${activeTab === "analytics" ? styles.active : ""}`}
//             onClick={() => setActiveTab("analytics")}>
//             <FontAwesomeIcon icon={faChartLine} />
//             <span>Analytics</span>
//           </button>

//           <button
//             className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}
//             onClick={() => setActiveTab("profile")}>
//             <FontAwesomeIcon icon={faUser} />
//             <span>Profile</span>
//           </button>

//           <button
//             className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
//             onClick={() => setActiveTab("settings")}>
//             <FontAwesomeIcon icon={faCog} />
//             <span>Settings</span>
//           </button>
//         </nav>

//         <button className={styles.logoutBtn} onClick={handleLogout}>
//           <FontAwesomeIcon icon={faSignOutAlt} />
//           <span>Logout</span>
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className={styles.main}>
//         {/* Header */}
//         <header className={styles.header}>
//           <div className={styles.headerLeft}>
//             <h1>Welcome back, Ravi!</h1>
//             <p>Here's what's happening with your kitchen today</p>
//           </div>

//           <div className={styles.headerRight}>
//             <button className={styles.notificationBtn}>
//               <FontAwesomeIcon icon={faBell} />
//               <span className={styles.badge}>3</span>
//             </button>
//           </div>
//         </header>

//         {/* Content Area */}
//         <div className={styles.content}>
//           {/* Dashboard Home */}
//           {activeTab === "home" && (
//             <div className={styles.home}>
//               {/* Stats Grid */}
//               <div className={styles.statsGrid}>
//                 {stats.map((stat, index) => (
//                   <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
//                     <div className={styles.statIcon}>
//                       <FontAwesomeIcon icon={stat.icon} />
//                     </div>
//                     <div className={styles.statContent}>
//                       <p className={styles.statLabel}>{stat.label}</p>
//                       <h3 className={styles.statValue}>{stat.value}</h3>
//                       <span className={styles.statChange}>{stat.change}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Recent Orders */}
//               <div className={styles.section}>
//                 <div className={styles.sectionHeader}>
//                   <h2>Recent Orders</h2>
//                   <button className={styles.viewAllBtn}>View All</button>
//                 </div>

//                 <div className={styles.ordersTable}>
//                   {recentOrders.map((order, index) => (
//                     <div key={index} className={styles.orderRow}>
//                       <div className={styles.orderInfo}>
//                         <h4>{order.id}</h4>
//                         <p className={styles.customerName}>{order.customer}</p>
//                         <p className={styles.orderItems}>{order.items}</p>
//                       </div>
//                       <div className={styles.orderMeta}>
//                         <p className={styles.orderAmount}>{order.amount}</p>
//                         <span
//                           className={`${styles.orderStatus} ${styles[getStatusColor(order.status)]}`}>
//                           {order.status}
//                         </span>
//                         <p className={styles.orderTime}>{order.time}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Orders Tab */}
//           {activeTab === "orders" && (
//             <div className={styles.ordersTab}>
//               <h2 className={styles.tabTitle}>All Orders</h2>
//               <div className={styles.ordersTable}>
//                 {recentOrders.map((order, index) => (
//                   <div key={index} className={styles.orderRow}>
//                     <div className={styles.orderInfo}>
//                       <h4>{order.id}</h4>
//                       <p className={styles.customerName}>{order.customer}</p>
//                       <p className={styles.orderItems}>{order.items}</p>
//                     </div>
//                     <div className={styles.orderMeta}>
//                       <p className={styles.orderAmount}>{order.amount}</p>
//                       <span
//                         className={`${styles.orderStatus} ${styles[getStatusColor(order.status)]}`}>
//                         {order.status}
//                       </span>
//                       <p className={styles.orderTime}>{order.time}</p>
//                       <button className={styles.actionBtn}>View Details</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Menu Tab */}
//           {activeTab === "menu" && (
//             <div className={styles.menuTab}>
//               <div className={styles.sectionHeader}>
//                 <h2 className={styles.tabTitle}>Your Menu</h2>
//                 <button className={styles.addBtn}>+ Add Item</button>
//               </div>

//               <div className={styles.menuGrid}>
//                 {menuItems.map((item, index) => (
//                   <div key={index} className={styles.menuCard}>
//                     <div className={styles.menuCardHeader}>
//                       <h3>{item.name}</h3>
//                       <span
//                         className={`${styles.menuStatus} ${item.status === "Available" ? styles.available : styles.outOfStock}`}>
//                         {item.status}
//                       </span>
//                     </div>
//                     <p className={styles.menuCategory}>{item.category}</p>
//                     <p className={styles.menuPrice}>{item.price}</p>
//                     <div className={styles.menuActions}>
//                       <button className={styles.editBtn}>
//                         <FontAwesomeIcon icon={faEdit} /> Edit
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Analytics Tab */}
//           {activeTab === "analytics" && (
//             <div className={styles.analyticsTab}>
//               <h2 className={styles.tabTitle}>Analytics & Reports</h2>

//               <div className={styles.analyticsGrid}>
//                 <div className={styles.analyticsCard}>
//                   <h3>Weekly Performance</h3>
//                   <div className={styles.chartPlaceholder}>
//                     <FontAwesomeIcon icon={faChartLine} />
//                     <p>Chart coming soon</p>
//                   </div>
//                 </div>

//                 <div className={styles.analyticsCard}>
//                   <h3>Top Selling Items</h3>
//                   <ul className={styles.topItemsList}>
//                     <li>1. Dal Makhani - 45 orders</li>
//                     <li>2. Paneer Butter Masala - 38 orders</li>
//                     <li>3. Veg Biryani - 32 orders</li>
//                     <li>4. Chole Bhature - 28 orders</li>
//                     <li>5. Roti - 156 orders</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Profile Tab */}
//           {activeTab === "profile" && (
//             <div className={styles.profileTab}>
//               <h2 className={styles.tabTitle}>Your Profile</h2>

//               <div className={styles.profileCard}>
//                 <div className={styles.profileHeader}>
//                   <div className={styles.profileAvatar}>
//                     <FontAwesomeIcon icon={faUser} />
//                     <button className={styles.uploadBtn}>
//                       <FontAwesomeIcon icon={faCamera} />
//                     </button>
//                   </div>
//                   <div className={styles.profileHeaderInfo}>
//                     <h3>{profile.name}</h3>
//                     <p>Partner since Feb 2024</p>
//                   </div>
//                   {!isEditing && (
//                     <button className={styles.editProfileBtn} onClick={() => setIsEditing(true)}>
//                       <FontAwesomeIcon icon={faEdit} /> Edit Profile
//                     </button>
//                   )}
//                 </div>

//                 <div className={styles.profileForm}>
//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faUser} />
//                       Kitchen Name
//                     </label>
//                     <input
//                       type='text'
//                       value={profile.name}
//                       disabled={!isEditing}
//                       onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faEnvelope} />
//                       Email
//                     </label>
//                     <input
//                       type='email'
//                       value={profile.email}
//                       disabled={!isEditing}
//                       onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faPhone} />
//                       Phone
//                     </label>
//                     <input
//                       type='tel'
//                       value={profile.phone}
//                       disabled={!isEditing}
//                       onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
//                     />
//                   </div>

//                   <div className={styles.formGroup}>
//                     <label>
//                       <FontAwesomeIcon icon={faMapMarkerAlt} />
//                       Address
//                     </label>
//                     <textarea
//                       value={profile.address}
//                       disabled={!isEditing}
//                       onChange={(e) => setProfile({ ...profile, address: e.target.value })}
//                       rows='3'
//                     />
//                   </div>

//                   <div className={styles.formRow}>
//                     <div className={styles.formGroup}>
//                       <label>FSSAI License</label>
//                       <input
//                         type='text'
//                         value={profile.fssai}
//                         disabled={!isEditing}
//                         onChange={(e) => setProfile({ ...profile, fssai: e.target.value })}
//                       />
//                     </div>

//                     <div className={styles.formGroup}>
//                       <label>Bank Account</label>
//                       <input
//                         type='text'
//                         value={profile.bankAccount}
//                         disabled={!isEditing}
//                         onChange={(e) => setProfile({ ...profile, bankAccount: e.target.value })}
//                       />
//                     </div>
//                   </div>

//                   {isEditing && (
//                     <div className={styles.formActions}>
//                       <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
//                         Cancel
//                       </button>
//                       <button className={styles.saveBtn} onClick={handleProfileUpdate}>
//                         <FontAwesomeIcon icon={faSave} /> Save Changes
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Settings Tab */}
//           {activeTab === "settings" && (
//             <div className={styles.settingsTab}>
//               <h2 className={styles.tabTitle}>Settings</h2>

//               <div className={styles.settingsCard}>
//                 <h3>Notification Preferences</h3>
//                 <div className={styles.settingItem}>
//                   <label>
//                     <input type='checkbox' defaultChecked />
//                     <span>Email notifications for new orders</span>
//                   </label>
//                 </div>
//                 <div className={styles.settingItem}>
//                   <label>
//                     <input type='checkbox' defaultChecked />
//                     <span>SMS notifications for payments</span>
//                   </label>
//                 </div>
//                 <div className={styles.settingItem}>
//                   <label>
//                     <input type='checkbox' />
//                     <span>Weekly performance reports</span>
//                   </label>
//                 </div>
//               </div>

//               <div className={styles.settingsCard}>
//                 <h3>Kitchen Availability</h3>
//                 <div className={styles.settingItem}>
//                   <label>
//                     <input type='checkbox' defaultChecked />
//                     <span>Accept new orders</span>
//                   </label>
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label>Operating Hours</label>
//                   <div className={styles.timeRange}>
//                     <input type='time' defaultValue='09:00' />
//                     <span>to</span>
//                     <input type='time' defaultValue='22:00' />
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.settingsCard}>
//                 <h3>Danger Zone</h3>
//                 <button className={styles.dangerBtn}>Deactivate Account</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faUtensils,
  faChartLine,
  faCog,
  faSignOutAlt,
  faBell,
  faCheckCircle,
  faClock,
  faTruck,
  faIndianRupeeSign,
  faUsers,
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faEdit,
  faSave,
  faCamera,
  faTimes,
  faBars,
  faBoxOpen,
  faStar,
  faCalendar,
  faMoneyBillWave,
  faPercent,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./PartnerDashboard.module.css";

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [isEditing, setIsEditing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ravi's Kitchen",
    email: "ravi@example.com",
    phone: "+91 98765 43210",
    address: "A1-405, Panchsheel Greens 1, Noida Extension",
    fssai: "12345678901234",
    bankAccount: "XXXX XXXX 1234",
  });

  const stats = [
    {
      icon: faClipboardList,
      label: "Today's Orders",
      value: "12",
      change: "+3 from yesterday",
      color: "orange",
    },
    {
      icon: faIndianRupeeSign,
      label: "Today's Revenue",
      value: "₹2,450",
      change: "+15% increase",
      color: "green",
    },
    {
      icon: faUsers,
      label: "Total Customers",
      value: "245",
      change: "+8 this week",
      color: "blue",
    },
    {
      icon: faCheckCircle,
      label: "Completed Orders",
      value: "156",
      change: "92% completion rate",
      color: "purple",
    },
  ];

  const weeklyStats = [
    { day: "Mon", orders: 18, revenue: 3200 },
    { day: "Tue", orders: 22, revenue: 3800 },
    { day: "Wed", orders: 20, revenue: 3500 },
    { day: "Thu", orders: 25, revenue: 4200 },
    { day: "Fri", orders: 28, revenue: 4800 },
    { day: "Sat", orders: 32, revenue: 5500 },
    { day: "Sun", orders: 30, revenue: 5200 },
  ];

  const recentOrders = [
    {
      id: "#1234",
      customer: "Rahul Sharma",
      items: "2x Dal Makhani, 3x Roti",
      amount: "₹340",
      status: "preparing",
      time: "5 min ago",
    },
    {
      id: "#1233",
      customer: "Priya Singh",
      items: "1x Paneer Butter Masala",
      amount: "₹280",
      status: "ready",
      time: "12 min ago",
    },
    {
      id: "#1232",
      customer: "Amit Patel",
      items: "2x Veg Biryani, 1x Raita",
      amount: "₹520",
      status: "delivered",
      time: "45 min ago",
    },
    {
      id: "#1231",
      customer: "Neha Gupta",
      items: "3x Chole Bhature",
      amount: "₹180",
      status: "delivered",
      time: "1 hour ago",
    },
  ];

  const menuItems = [
    {
      name: "Dal Makhani",
      price: "₹180",
      category: "Main Course",
      status: "Available",
      orders: 45,
      rating: 4.8,
    },
    {
      name: "Paneer Butter Masala",
      price: "₹220",
      category: "Main Course",
      status: "Available",
      orders: 38,
      rating: 4.9,
    },
    {
      name: "Veg Biryani",
      price: "₹250",
      category: "Rice",
      status: "Available",
      orders: 32,
      rating: 4.7,
    },
    {
      name: "Chole Bhature",
      price: "₹120",
      category: "Breakfast",
      status: "Out of Stock",
      orders: 28,
      rating: 4.6,
    },
    {
      name: "Roti (3 pcs)",
      price: "₹30",
      category: "Bread",
      status: "Available",
      orders: 156,
      rating: 4.5,
    },
  ];

  const notifications = [
    {
      id: 1,
      text: "New order received from Rahul Sharma",
      time: "5 min ago",
      type: "order",
      read: false,
    },
    {
      id: 2,
      text: "Payment of ₹2,450 has been credited",
      time: "2 hours ago",
      type: "payment",
      read: false,
    },
    { id: 3, text: "Your menu has been approved", time: "1 day ago", type: "info", read: true },
    {
      id: 4,
      text: "Low stock alert: Chole Bhature",
      time: "2 days ago",
      type: "warning",
      read: true,
    },
  ];

  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter((n) => !n.read).length;

  const handleProfileUpdate = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      window.location.href = "/partner";
    }
  };

  const markAsRead = (id) => {
    setNotificationList(notificationList.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotificationList([]);
    setShowNotifications(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "orange";
      case "ready":
        return "blue";
      case "delivered":
        return "green";
      default:
        return "gray";
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
  };

  return (
    <div className={styles.dashboard}>
      {/* Mobile Menu Button */}
      <button className={styles.mobileMenuBtn} onClick={() => setShowMobileMenu(!showMobileMenu)}>
        <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${showMobileMenu ? styles.showMobile : ""}`}>
        <div className={styles.logo}>
          <img src='/images/logo2.png' alt='Raavito' />
          <p>Partner Dashboard</p>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeTab === "home" ? styles.active : ""}`}
            onClick={() => handleTabChange("home")}>
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
            onClick={() => handleTabChange("orders")}>
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Orders</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "menu" ? styles.active : ""}`}
            onClick={() => handleTabChange("menu")}>
            <FontAwesomeIcon icon={faUtensils} />
            <span>Menu</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "analytics" ? styles.active : ""}`}
            onClick={() => handleTabChange("analytics")}>
            <FontAwesomeIcon icon={faChartLine} />
            <span>Analytics</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}
            onClick={() => handleTabChange("profile")}>
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
            onClick={() => handleTabChange("settings")}>
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </button>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Overlay for mobile */}
      {showMobileMenu && (
        <div className={styles.overlay} onClick={() => setShowMobileMenu(false)} />
      )}

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Welcome back, Ravi!</h1>
            <p>Here's what's happening with your kitchen today</p>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.notificationWrapper}>
              <button
                className={styles.notificationBtn}
                onClick={() => setShowNotifications(!showNotifications)}>
                <FontAwesomeIcon icon={faBell} />
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className={styles.notificationsDropdown}>
                  <div className={styles.notificationsHeader}>
                    <h3>Notifications</h3>
                    {notificationList.length > 0 && (
                      <button onClick={clearAllNotifications}>Clear All</button>
                    )}
                  </div>

                  <div className={styles.notificationsList}>
                    {notificationList.length === 0 ? (
                      <div className={styles.emptyNotifications}>
                        <FontAwesomeIcon icon={faBell} />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notificationList.map((notif) => (
                        <div
                          key={notif.id}
                          className={`${styles.notificationItem} ${!notif.read ? styles.unread : ""}`}
                          onClick={() => markAsRead(notif.id)}>
                          <div className={styles.notifIcon}>
                            <FontAwesomeIcon
                              icon={
                                notif.type === "order"
                                  ? faClipboardList
                                  : notif.type === "payment"
                                    ? faMoneyBillWave
                                    : notif.type === "warning"
                                      ? faBell
                                      : faCheckCircle
                              }
                            />
                          </div>
                          <div className={styles.notifContent}>
                            <p>{notif.text}</p>
                            <span>{notif.time}</span>
                          </div>
                          {!notif.read && <div className={styles.unreadDot} />}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className={styles.content}>
          {/* Dashboard Home */}
          {activeTab === "home" && (
            <div className={styles.home}>
              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
                    <div className={styles.statIcon}>
                      <FontAwesomeIcon icon={stat.icon} />
                    </div>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>{stat.label}</p>
                      <h3 className={styles.statValue}>{stat.value}</h3>
                      <span className={styles.statChange}>{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className={styles.quickActions}>
                <button className={styles.quickActionCard}>
                  <FontAwesomeIcon icon={faBoxOpen} />
                  <span>Mark Item Out of Stock</span>
                </button>
                <button className={styles.quickActionCard}>
                  <FontAwesomeIcon icon={faPercent} />
                  <span>Create Discount</span>
                </button>
                <button className={styles.quickActionCard}>
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>View Schedule</span>
                </button>
              </div>

              {/* Two Column Layout */}
              <div className={styles.dashboardGrid}>
                {/* Recent Orders */}
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2>Recent Orders</h2>
                    <button className={styles.viewAllBtn} onClick={() => setActiveTab("orders")}>
                      View All
                    </button>
                  </div>

                  <div className={styles.ordersTable}>
                    {recentOrders.slice(0, 3).map((order, index) => (
                      <div key={index} className={styles.orderRow}>
                        <div className={styles.orderInfo}>
                          <h4>{order.id}</h4>
                          <p className={styles.customerName}>{order.customer}</p>
                          <p className={styles.orderItems}>{order.items}</p>
                        </div>
                        <div className={styles.orderMeta}>
                          <p className={styles.orderAmount}>{order.amount}</p>
                          <span
                            className={`${styles.orderStatus} ${styles[getStatusColor(order.status)]}`}>
                            {order.status}
                          </span>
                          <p className={styles.orderTime}>{order.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Items */}
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2>Top Performing Items</h2>
                    <FontAwesomeIcon icon={faTrophy} className={styles.trophyIcon} />
                  </div>

                  <div className={styles.topItemsList}>
                    {menuItems.slice(0, 5).map((item, index) => (
                      <div key={index} className={styles.topItem}>
                        <div className={styles.topItemRank}>#{index + 1}</div>
                        <div className={styles.topItemInfo}>
                          <h4>{item.name}</h4>
                          <div className={styles.topItemMeta}>
                            <span>{item.orders} orders</span>
                            <span className={styles.rating}>
                              <FontAwesomeIcon icon={faStar} /> {item.rating}
                            </span>
                          </div>
                        </div>
                        <div className={styles.topItemPrice}>{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className={styles.ordersTab}>
              <h2 className={styles.tabTitle}>All Orders</h2>
              <div className={styles.ordersTable}>
                {recentOrders.map((order, index) => (
                  <div key={index} className={styles.orderRow}>
                    <div className={styles.orderInfo}>
                      <h4>{order.id}</h4>
                      <p className={styles.customerName}>{order.customer}</p>
                      <p className={styles.orderItems}>{order.items}</p>
                    </div>
                    <div className={styles.orderMeta}>
                      <p className={styles.orderAmount}>{order.amount}</p>
                      <span
                        className={`${styles.orderStatus} ${styles[getStatusColor(order.status)]}`}>
                        {order.status}
                      </span>
                      <p className={styles.orderTime}>{order.time}</p>
                      <button className={styles.actionBtn}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Menu Tab */}
          {activeTab === "menu" && (
            <div className={styles.menuTab}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.tabTitle}>Your Menu</h2>
                <button className={styles.addBtn}>+ Add Item</button>
              </div>

              <div className={styles.menuGrid}>
                {menuItems.map((item, index) => (
                  <div key={index} className={styles.menuCard}>
                    <div className={styles.menuCardHeader}>
                      <h3>{item.name}</h3>
                      <span
                        className={`${styles.menuStatus} ${item.status === "Available" ? styles.available : styles.outOfStock}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className={styles.menuCategory}>{item.category}</p>
                    <div className={styles.menuStats}>
                      <div className={styles.menuStat}>
                        <FontAwesomeIcon icon={faClipboardList} />
                        <span>{item.orders} orders</span>
                      </div>
                      <div className={styles.menuStat}>
                        <FontAwesomeIcon icon={faStar} />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <p className={styles.menuPrice}>{item.price}</p>
                    <div className={styles.menuActions}>
                      <button className={styles.editBtn}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className={styles.analyticsTab}>
              <h2 className={styles.tabTitle}>Analytics & Reports</h2>

              {/* Weekly Chart */}
              <div className={styles.weeklyChart}>
                <h3>Weekly Performance</h3>
                <div className={styles.chartBars}>
                  {weeklyStats.map((stat, index) => (
                    <div key={index} className={styles.chartBar}>
                      <div
                        className={styles.bar}
                        style={{ height: `${(stat.orders / 35) * 100}%` }}>
                        <span className={styles.barValue}>{stat.orders}</span>
                      </div>
                      <div className={styles.barLabel}>{stat.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.analyticsGrid}>
                <div className={styles.analyticsCard}>
                  <h3>Revenue Breakdown</h3>
                  <div className={styles.revenueList}>
                    {weeklyStats.map((stat, index) => (
                      <div key={index} className={styles.revenueItem}>
                        <span>{stat.day}</span>
                        <span className={styles.revenueAmount}>₹{stat.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.analyticsCard}>
                  <h3>Top Selling Items</h3>
                  <ul className={styles.topItemsList}>
                    <li>1. Dal Makhani - 45 orders</li>
                    <li>2. Paneer Butter Masala - 38 orders</li>
                    <li>3. Veg Biryani - 32 orders</li>
                    <li>4. Chole Bhature - 28 orders</li>
                    <li>5. Roti - 156 orders</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className={styles.profileTab}>
              <h2 className={styles.tabTitle}>Your Profile</h2>

              <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                  <div className={styles.profileAvatar}>
                    <FontAwesomeIcon icon={faUser} />
                    <button className={styles.uploadBtn}>
                      <FontAwesomeIcon icon={faCamera} />
                    </button>
                  </div>
                  <div className={styles.profileHeaderInfo}>
                    <h3>{profile.name}</h3>
                    <p>Partner since Feb 2024</p>
                  </div>
                  {!isEditing && (
                    <button className={styles.editProfileBtn} onClick={() => setIsEditing(true)}>
                      <FontAwesomeIcon icon={faEdit} /> Edit Profile
                    </button>
                  )}
                </div>

                <div className={styles.profileForm}>
                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faUser} />
                      Kitchen Name
                    </label>
                    <input
                      type='text'
                      value={profile.name}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faEnvelope} />
                      Email
                    </label>
                    <input
                      type='email'
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faPhone} />
                      Phone
                    </label>
                    <input
                      type='tel'
                      value={profile.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      Address
                    </label>
                    <textarea
                      value={profile.address}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      rows='3'
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>FSSAI License</label>
                      <input
                        type='text'
                        value={profile.fssai}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, fssai: e.target.value })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Bank Account</label>
                      <input
                        type='text'
                        value={profile.bankAccount}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, bankAccount: e.target.value })}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className={styles.formActions}>
                      <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                      <button className={styles.saveBtn} onClick={handleProfileUpdate}>
                        <FontAwesomeIcon icon={faSave} /> Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className={styles.settingsTab}>
              <h2 className={styles.tabTitle}>Settings</h2>

              <div className={styles.settingsCard}>
                <h3>Notification Preferences</h3>
                <div className={styles.settingItem}>
                  <label>
                    <input type='checkbox' defaultChecked />
                    <span>Email notifications for new orders</span>
                  </label>
                </div>
                <div className={styles.settingItem}>
                  <label>
                    <input type='checkbox' defaultChecked />
                    <span>SMS notifications for payments</span>
                  </label>
                </div>
                <div className={styles.settingItem}>
                  <label>
                    <input type='checkbox' />
                    <span>Weekly performance reports</span>
                  </label>
                </div>
              </div>

              <div className={styles.settingsCard}>
                <h3>Kitchen Availability</h3>
                <div className={styles.settingItem}>
                  <label>
                    <input type='checkbox' defaultChecked />
                    <span>Accept new orders</span>
                  </label>
                </div>
                <div className={styles.formGroup}>
                  <label>Operating Hours</label>
                  <div className={styles.timeRange}>
                    <input type='time' defaultValue='09:00' />
                    <span>to</span>
                    <input type='time' defaultValue='22:00' />
                  </div>
                </div>
              </div>

              <div className={styles.settingsCard}>
                <h3>Danger Zone</h3>
                <button className={styles.dangerBtn}>Deactivate Account</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
