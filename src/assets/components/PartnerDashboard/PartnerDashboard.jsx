import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faChartLine,
  faUtensils,
  faCog,
  faSignOutAlt,
  faBell,
  faCheckCircle,
  faClock,
  faBox,
  faTruck,
  faRupeeSign,
  faChevronRight,
  faUser,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./PartnerDashboard.module.css";

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    {
      icon: faClipboardList,
      label: "Today's Orders",
      value: "12",
      change: "+3 from yesterday",
      color: "orange",
    },
    {
      icon: faRupeeSign,
      label: "Today's Revenue",
      value: "₹2,450",
      change: "+15% from yesterday",
      color: "green",
    },
    {
      icon: faCheckCircle,
      label: "Completed",
      value: "8",
      change: "4 pending",
      color: "blue",
    },
    {
      icon: faClock,
      label: "Avg. Prep Time",
      value: "18 min",
      change: "Target: 20 min",
      color: "purple",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1234",
      customer: "Rahul Sharma",
      items: "2x Dal Tadka, 3x Roti",
      amount: "₹280",
      status: "preparing",
      time: "5 min ago",
    },
    {
      id: "#ORD-1233",
      customer: "Priya Singh",
      items: "1x Paneer Butter Masala, 2x Naan",
      amount: "₹350",
      status: "ready",
      time: "12 min ago",
    },
    {
      id: "#ORD-1232",
      customer: "Amit Kumar",
      items: "3x Chole Bhature",
      amount: "₹420",
      status: "delivered",
      time: "25 min ago",
    },
  ];

  const menuItems = [
    { name: "Dal Tadka", price: "₹120", status: "Available" },
    { name: "Paneer Butter Masala", price: "₹180", status: "Available" },
    { name: "Chole Bhature", price: "₹140", status: "Out of Stock" },
  ];

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

  const getStatusText = (status) => {
    switch (status) {
      case "preparing":
        return "Preparing";
      case "ready":
        return "Ready";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faStore} />
          <span>RAAVITO Partner</span>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeTab === "dashboard" ? styles.active : ""}`}
            onClick={() => setActiveTab("dashboard")}>
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
            onClick={() => setActiveTab("orders")}>
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Orders</span>
            <span className={styles.badge}>4</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "menu" ? styles.active : ""}`}
            onClick={() => setActiveTab("menu")}>
            <FontAwesomeIcon icon={faUtensils} />
            <span>Menu</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "analytics" ? styles.active : ""}`}
            onClick={() => setActiveTab("analytics")}>
            <FontAwesomeIcon icon={faChartLine} />
            <span>Analytics</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
            onClick={() => setActiveTab("settings")}>
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </button>
        </nav>

        <button className={styles.logoutBtn}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Welcome back, Chef! 👋</h1>
            <p>Here's what's happening with your kitchen today</p>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.notificationBtn}>
              <FontAwesomeIcon icon={faBell} />
              <span className={styles.notificationDot}></span>
            </button>
            <div className={styles.profile}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        </header>

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

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Recent Orders */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Recent Orders</h2>
              <button className={styles.viewAllBtn}>
                View All
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <div className={styles.ordersList}>
              {recentOrders.map((order, index) => (
                <div key={index} className={styles.orderItem}>
                  <div className={styles.orderLeft}>
                    <div className={styles.orderIcon}>
                      <FontAwesomeIcon icon={faBox} />
                    </div>
                    <div className={styles.orderInfo}>
                      <h4>{order.id}</h4>
                      <p className={styles.customerName}>{order.customer}</p>
                      <p className={styles.orderItems}>{order.items}</p>
                      <span className={styles.orderTime}>{order.time}</span>
                    </div>
                  </div>
                  <div className={styles.orderRight}>
                    <p className={styles.orderAmount}>{order.amount}</p>
                    <span
                      className={`${styles.orderStatus} ${styles[getStatusColor(order.status)]}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Menu */}
          <div className={styles.sidebar2}>
            {/* Quick Actions */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Quick Actions</h2>
              </div>
              <div className={styles.quickActions}>
                <button className={styles.actionBtn}>
                  <FontAwesomeIcon icon={faUtensils} />
                  <span>Add Item</span>
                </button>
                <button className={styles.actionBtn}>
                  <FontAwesomeIcon icon={faTruck} />
                  <span>Track Orders</span>
                </button>
                <button className={styles.actionBtn}>
                  <FontAwesomeIcon icon={faChartLine} />
                  <span>View Reports</span>
                </button>
              </div>
            </div>

            {/* Top Menu Items */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Menu Status</h2>
              </div>
              <div className={styles.menuList}>
                {menuItems.map((item, index) => (
                  <div key={index} className={styles.menuItem}>
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.price}</p>
                    </div>
                    <span
                      className={`${styles.menuStatus} ${item.status === "Available" ? styles.available : styles.outOfStock}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
