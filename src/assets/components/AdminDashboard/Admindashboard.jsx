import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import styles from "./AdminDashboard.module.css";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "dashboard",
      modalVisible: false,
      modalType: "",
      selectedItem: null,
      searchTerm: "",
      sidebarCollapsed: false,
      showProfileMenu: false,
      dateRange: "today",
      loading: false,
      formData: {
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        available: true,
        kitchenId: "",
        cuisine: "",
        location: "",
        status: "active",
        phone: "",
        email: "",
        preparationTime: "",
        tags: "",
        title: "",
        subtitle: "",
        gradient: [],
        isActive: true,
        startDate: null,
        endDate: null,
      },
      formErrors: {},
      notifications: [],
      dashboardStats: {
        totalRevenue: 0,
        totalOrders: 0,
        activeKitchens: 0,
        pendingOrders: 0,
        todayRevenue: 0,
        todayOrders: 0,
        monthlyGrowth: 0,
        customerSatisfaction: 0,
        avgDeliveryTime: 0,
        cancelRate: 0,
        repeatCustomers: 0,
        peakHours: "12PM - 2PM, 7PM - 9PM",
      },
      revenueData: [
        { day: "Mon", revenue: 0, orders: 0 },
        { day: "Tue", revenue: 0, orders: 0 },
        { day: "Wed", revenue: 0, orders: 0 },
        { day: "Thu", revenue: 0, orders: 0 },
        { day: "Fri", revenue: 0, orders: 0 },
        { day: "Sat", revenue: 0, orders: 0 },
        { day: "Sun", revenue: 0, orders: 0 },
      ],
      kitchens: [
        {
          id: 1,
          name: "Shree Krishna Bhojanalaya",
          cuisine: "North Indian",
          status: "active",
          rating: 4.8,
          orders: 1534,
          location: "Karol Bagh, Delhi",
          revenue: 182450,
          phone: "+91-9876543210",
          email: "krishnabhoj@gmail.com",
          joinDate: "2023-01-15",
          completionRate: 98.5,
          avgPrepTime: 28,
          isOnline: true,
        },
        {
          id: 2,
          name: "Annapurna Kitchen",
          cuisine: "South Indian",
          status: "active",
          rating: 4.9,
          orders: 1289,
          location: "Indiranagar, Bangalore",
          revenue: 168900,
          phone: "+91-9876543211",
          email: "annapurna.kitchen@gmail.com",
          joinDate: "2023-02-20",
          completionRate: 99.2,
          avgPrepTime: 25,
          isOnline: true,
        },
        {
          id: 3,
          name: "Gujarati Rasoi",
          cuisine: "Gujarati",
          status: "active",
          rating: 4.7,
          orders: 956,
          location: "Navrangpura, Ahmedabad",
          revenue: 142780,
          phone: "+91-9876543212",
          email: "gujaratirasoi@gmail.com",
          joinDate: "2023-03-10",
          completionRate: 97.1,
          avgPrepTime: 30,
          isOnline: true,
        },
        {
          id: 4,
          name: "Sattvik Bhojan",
          cuisine: "Rajasthani",
          status: "active",
          rating: 4.6,
          orders: 845,
          location: "Malviya Nagar, Jaipur",
          revenue: 128900,
          phone: "+91-9876543213",
          email: "sattvikbhojan@gmail.com",
          joinDate: "2023-01-05",
          completionRate: 96.8,
          avgPrepTime: 32,
          isOnline: false,
        },
        {
          id: 5,
          name: "Maharashtrian Swaad",
          cuisine: "Maharashtrian",
          status: "active",
          rating: 4.8,
          orders: 1178,
          location: "Deccan, Pune",
          revenue: 154680,
          phone: "+91-9876543214",
          email: "mahswaad@gmail.com",
          joinDate: "2023-04-12",
          completionRate: 98.2,
          avgPrepTime: 26,
          isOnline: true,
        },
        {
          id: 6,
          name: "Bengali Ghare Ranna",
          cuisine: "Bengali",
          status: "inactive",
          rating: 4.5,
          orders: 623,
          location: "Salt Lake, Kolkata",
          revenue: 98450,
          phone: "+91-9876543215",
          email: "ghareranna@gmail.com",
          joinDate: "2023-05-20",
          completionRate: 94.5,
          avgPrepTime: 35,
          isOnline: false,
        },
      ],
      deals: [],
      loadingDeals: false,
      menuItems: [
        {
          id: 1,
          kitchenId: 1,
          name: "Paneer Butter Masala",
          price: 249,
          category: "Main Course",
          available: true,
          description: "Creamy tomato gravy with soft paneer cubes, garnished with fresh cream",
          image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300",
          popularity: 98,
          orderCount: 534,
          preparationTime: 25,
          tags: ["bestseller", "creamy"],
          isVeg: true,
        },
        {
          id: 2,
          kitchenId: 1,
          name: "Dal Makhani",
          price: 199,
          category: "Main Course",
          available: true,
          description: "Black lentils slow-cooked overnight with butter and cream",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300",
          popularity: 95,
          orderCount: 456,
          preparationTime: 20,
          tags: ["bestseller", "protein-rich"],
          isVeg: true,
        },
        {
          id: 3,
          kitchenId: 2,
          name: "Masala Dosa",
          price: 149,
          category: "Breakfast",
          available: true,
          description:
            "Crispy rice crepe filled with spiced potato masala, served with sambar & chutney",
          image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300",
          popularity: 96,
          orderCount: 698,
          preparationTime: 18,
          tags: ["bestseller", "crispy"],
          isVeg: true,
        },
        {
          id: 4,
          kitchenId: 2,
          name: "Idli Sambar",
          price: 99,
          category: "Breakfast",
          available: true,
          description: "Soft steamed rice cakes with lentil soup and coconut chutney",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300",
          popularity: 92,
          orderCount: 542,
          preparationTime: 15,
          tags: ["healthy", "light"],
          isVeg: true,
        },
        {
          id: 5,
          kitchenId: 3,
          name: "Gujarati Thali",
          price: 349,
          category: "Thali",
          available: true,
          description: "Complete meal with dal, kadhi, sabzi, roti, rice, papad, pickle & sweet",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300",
          popularity: 97,
          orderCount: 423,
          preparationTime: 30,
          tags: ["complete-meal", "bestseller"],
          isVeg: true,
        },
        {
          id: 6,
          kitchenId: 3,
          name: "Dhokla",
          price: 129,
          category: "Snacks",
          available: true,
          description: "Steamed fermented gram flour cake with mustard tempering",
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300",
          popularity: 88,
          orderCount: 312,
          preparationTime: 12,
          tags: ["healthy", "steamed"],
          isVeg: true,
        },
        {
          id: 7,
          kitchenId: 4,
          name: "Dal Baati Churma",
          price: 299,
          category: "Main Course",
          available: true,
          description: "Baked wheat balls with five lentil dal and sweet churma",
          image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=300",
          popularity: 94,
          orderCount: 387,
          preparationTime: 35,
          tags: ["traditional", "wholesome"],
          isVeg: true,
        },
        {
          id: 8,
          kitchenId: 5,
          name: "Misal Pav",
          price: 169,
          category: "Breakfast",
          available: true,
          description: "Spicy sprouted moth bean curry with pav, farsan, onions & lemon",
          image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300",
          popularity: 93,
          orderCount: 478,
          preparationTime: 20,
          tags: ["spicy", "protein-rich"],
          isVeg: true,
        },
        {
          id: 9,
          kitchenId: 5,
          name: "Puran Poli",
          price: 179,
          category: "Sweets",
          available: true,
          description: "Sweet flatbread stuffed with chana dal and jaggery",
          image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=300",
          popularity: 89,
          orderCount: 234,
          preparationTime: 25,
          tags: ["sweet", "traditional"],
          isVeg: true,
        },
        {
          id: 10,
          kitchenId: 6,
          name: "Aloo Posto",
          price: 189,
          category: "Main Course",
          available: false,
          description: "Potatoes cooked with poppy seed paste, a Bengali delicacy",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300",
          popularity: 85,
          orderCount: 198,
          preparationTime: 22,
          tags: ["mild", "traditional"],
          isVeg: true,
        },
      ],
      orders: [],
      users: [],
      settings: {
        platformFee: 12,
        deliveryRadius: 15,
        minOrderAmount: 99,
        maxPrepTime: 60,
        autoAssignDrivers: true,
        notifyLowStock: true,
        emailNotifications: true,
        smsNotifications: true,
      },
    };
  }

  componentDidMount() {
    document.title = "Raavito Admin - Pure Veg Platform";
    this.loadAllData();
    
    setTimeout(() => {
      this.showInfo("Namaste! Welcome to Raavito Admin Dashboard 🙏");
    }, 500);

    this.updateInterval = setInterval(() => {
      this.loadAllData();
    }, 60000); // Refresh every minute
  }

  loadAllData = async () => {
    try {
      this.setState({ loading: true });
      await Promise.all([
        this.loadKitchens(),
        this.loadMenuItems(),
        this.loadOrders(),
        this.loadUsers(),
        this.loadDashboardStats(),
        this.loadDeals(),
      ]);
    } catch (error) {
      console.error("Error loading data:", error);
      this.showError("Failed to load dashboard data");
    } finally {
      this.setState({ loading: false });
    }
  };

  loadKitchens = async () => {
    try {
      const response = await api.get("/kitchens");
      const kitchens = response.data.map((k) => ({
        id: k._id,
        _id: k._id,
        name: k.name,
        cuisine: k.cuisineType || k.cuisine,
        status: k.isActive ? "active" : "inactive",
        rating: k.averageRating || k.rating || 0,
        orders: k.totalOrders || 0,
        location: k.location,
        revenue: 0, // Calculate from orders if needed
        phone: k.mobile,
        email: k.email,
        joinDate: k.createdAt ? new Date(k.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        completionRate: 98,
        avgPrepTime: 30,
        isOnline: k.isActive,
        isVerified: k.isVerified,
      }));
      this.setState({ kitchens });
    } catch (error) {
      console.error("Error loading kitchens:", error);
      this.showError("Failed to load kitchens");
    }
  };

  loadMenuItems = async () => {
    try {
      const response = await api.get("/menu");
      const menuItems = response.data.map((item) => ({
        id: item._id,
        _id: item._id,
        kitchenId: item.kitchen?._id || item.kitchen,
        name: item.name,
        price: item.price,
        category: item.category,
        available: item.isAvailable,
        description: item.description || "",
        image: item.image || "https://via.placeholder.com/300x200?text=🥗",
        popularity: 90,
        orderCount: 0,
        preparationTime: 25,
        tags: item.isBestseller ? ["bestseller"] : [],
      }));
      this.setState({ menuItems });
    } catch (error) {
      console.error("Error loading menu items:", error);
      this.showError("Failed to load menu items");
    }
  };

  loadOrders = async () => {
    try {
      const response = await api.get("/orders");
      const orders = response.data.map((order) => ({
        id: order._id,
        _id: order._id,
        customer: order.user?.firstName
          ? `${order.user.firstName} ${order.user.lastName || ""}`.trim()
          : "Customer",
        customerEmail: order.user?.email || "",
        customerPhone: order.user?.mobile || "",
        kitchen: order.kitchen?.name || "Unknown Kitchen",
        kitchenId: order.kitchen?._id || order.kitchen,
        items: order.items || [],
        total: order.totalAmount || 0,
        status: order.status || "pending",
        priority: "normal",
        orderTime: order.createdAt || new Date().toISOString(),
        deliveryTime: order.deliveredAt || null,
        address: order.deliveryAddress?.address || "",
        paymentMethod: order.paymentMethod || "Cash",
        tip: 0,
      }));
      this.setState({ orders });
      
      const pendingOrders = orders.filter((order) => order.status === "pending").length;
      if (pendingOrders > 0) {
        setTimeout(() => {
          this.showWarning(`${pendingOrders} orders need immediate attention!`);
        }, 1500);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      this.showError("Failed to load orders");
    }
  };

  loadUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      const users = response.data.users.map((user) => ({
        id: user._id,
        _id: user._id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
        email: user.email || "",
        phone: user.mobile || "",
        totalOrders: 0,
        totalSpent: 0,
        joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        status: "active",
        favoriteKitchen: "",
        lastOrder: "",
        loyaltyPoints: 0,
      }));
      this.setState({ users });
    } catch (error) {
      console.error("Error loading users:", error);
      this.showError("Failed to load users");
    }
  };

  loadDashboardStats = async () => {
    try {
      const [summaryRes, kitchensRes, ordersRes] = await Promise.all([
        api.get("/admin/summary"),
        api.get("/kitchens"),
        api.get("/orders"),
      ]);

      const kitchens = kitchensRes.data;
      const orders = ordersRes.data;
      const summary = summaryRes.data;

      const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const pendingOrders = orders.filter((o) => o.status === "pending").length;
      const activeKitchens = kitchens.filter((k) => k.isActive && k.isVerified).length;

      this.setState({
        dashboardStats: {
          totalRevenue,
          totalOrders: summary.orders || orders.length,
          activeKitchens,
          pendingOrders,
          todayRevenue: 0,
          todayOrders: 0,
          monthlyGrowth: 0,
          customerSatisfaction: 4.5,
          avgDeliveryTime: 30,
          cancelRate: 2,
          repeatCustomers: 70,
          peakHours: "12PM - 2PM, 7PM - 9PM",
        },
      });
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  };

  loadDeals = async () => {
    try {
      this.setState({ loadingDeals: true });
      const response = await api.get("/deals");
      this.setState({ deals: response.data });
    } catch (error) {
      console.error("Error loading deals:", error);
      this.showError("Failed to load deals");
    } finally {
      this.setState({ loadingDeals: false });
    }
  };

  componentWillUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  simulateRealTimeUpdate = () => {
    this.setState((prev) => ({
      dashboardStats: {
        ...prev.dashboardStats,
        todayOrders: prev.dashboardStats.todayOrders + Math.floor(Math.random() * 3),
        todayRevenue: prev.dashboardStats.todayRevenue + Math.floor(Math.random() * 500),
      },
    }));
  };

  cx = (...names) => {
    return names
      .filter(Boolean)
      .map((name) => {
        if (typeof name !== "string") return "";
        return name
          .split(" ")
          .map((cls) => styles[cls] || cls)
          .join(" ");
      })
      .join(" ");
  };

  // Notification system
  showNotification = (message, type = "info", duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, timestamp: new Date() };
    this.setState((prev) => ({
      notifications: [...prev.notifications, notification],
    }));
    if (duration > 0) {
      setTimeout(() => this.removeNotification(id), duration);
    }
  };

  removeNotification = (id) => {
    this.setState((prev) => ({
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  };

  showSuccess = (message) => this.showNotification(message, "success");
  showError = (message) => this.showNotification(message, "error");
  showWarning = (message) => this.showNotification(message, "warning");
  showInfo = (message) => this.showNotification(message, "info");

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab, searchTerm: "" });
  };

  setSearchTerm = (value) => this.setState({ searchTerm: value });

  toggleSidebar = () => {
    this.setState((prev) => ({ sidebarCollapsed: !prev.sidebarCollapsed }));
  };

  resetForm = () => {
    this.setState({
      formData: {
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        available: true,
        kitchenId: "",
        cuisine: "",
        location: "",
        status: "active",
        phone: "",
        email: "",
        preparationTime: "",
        tags: "",
        title: "",
        subtitle: "",
        gradient: [],
        isActive: true,
        startDate: null,
        endDate: null,
      },
      formErrors: {},
    });
  };

  validateForm = (type) => {
    const { formData } = this.state;
    const errors = {};
    let hasErrors = false;

    if (type === "menu") {
      if (!formData.name?.trim()) {
        errors.name = "Item name is required";
        hasErrors = true;
      }
      if (!formData.price || formData.price <= 0) {
        errors.price = "Valid price is required";
        hasErrors = true;
      }
      if (!formData.kitchenId) {
        errors.kitchenId = "Kitchen selection is required";
        hasErrors = true;
      }
      if (!formData.category?.trim()) {
        errors.category = "Category is required";
        hasErrors = true;
      }
    } else if (type === "kitchen") {
      if (!formData.name?.trim()) {
        errors.name = "Kitchen name is required";
        hasErrors = true;
      }
      if (!formData.cuisine?.trim()) {
        errors.cuisine = "Cuisine type is required";
        hasErrors = true;
      }
      if (!formData.location?.trim()) {
        errors.location = "Location is required";
        hasErrors = true;
      }
      if (formData.email && !this.isValidEmail(formData.email)) {
        errors.email = "Valid email is required";
        hasErrors = true;
      }
    }

    this.setState({ formErrors: errors });
    if (hasErrors) {
      this.showError("Please fix the form errors before submitting");
    }
    return !hasErrors;
  };

  isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  openModal = (type, item = null) => {
    if (item) {
      const formData = { ...item };
      if (type === "menu" && item.tags) {
        formData.tags = item.tags.join(", ");
      }
      if (type === "deal" && item.gradientColors) {
        formData.gradient = item.gradientColors;
      }
      this.setState({
        modalType: type,
        selectedItem: item,
        formData,
        modalVisible: true,
        formErrors: {},
      });
    } else {
      this.resetForm();
      this.setState({
        modalType: type,
        selectedItem: null,
        modalVisible: true,
        formErrors: {},
      });
    }
  };

  closeModal = () => {
    this.setState({ modalVisible: false, selectedItem: null, formErrors: {} }, this.resetForm);
  };

  handleMenuSubmit = async () => {
    if (!this.validateForm("menu")) return;

    const { formData, selectedItem } = this.state;
    const menuData = {
      name: formData.name,
      price: parseFloat(formData.price),
      kitchen: formData.kitchenId,
      category: formData.category,
      description: formData.description || "",
      image: formData.image || "",
      isAvailable: formData.available !== false,
      isVeg: true,
      isBestseller: formData.tags?.includes("bestseller") || false,
    };

    try {
      if (selectedItem?._id || selectedItem?.id) {
        const id = selectedItem._id || selectedItem.id;
        await api.put(`/menu/${id}`, menuData);
        this.showSuccess(`"${menuData.name}" updated successfully! ✅`);
      } else {
        await api.post("/menu", menuData);
        this.showSuccess(`"${menuData.name}" added to menu! 🍽️`);
      }
      await this.loadMenuItems();
      this.closeModal();
    } catch (error) {
      console.error("Error saving menu item:", error);
      this.showError(error.response?.data?.message || "Failed to save menu item");
    }
  };

  handleKitchenSubmit = async () => {
    if (!this.validateForm("kitchen")) return;

    const { formData, selectedItem } = this.state;
    const kitchenData = {
      name: formData.name,
      cuisineType: formData.cuisine,
      location: formData.location,
      mobile: formData.phone || "",
      email: formData.email || "",
      isActive: formData.status === "active",
    };

    try {
      if (selectedItem?._id || selectedItem?.id) {
        const id = selectedItem._id || selectedItem.id;
        await api.put(`/kitchens/${id}`, kitchenData);
        this.showSuccess(`Kitchen "${kitchenData.name}" updated! ✅`);
      } else {
        // For new kitchens, use the register endpoint
        await api.post("/kitchens/register", {
          ...kitchenData,
          ownerName: formData.name,
          address: formData.location,
          pincode: "000000",
        });
        this.showSuccess(`Welcome "${kitchenData.name}" to Raavito! 🎉`);
      }
      await this.loadKitchens();
      this.closeModal();
    } catch (error) {
      console.error("Error saving kitchen:", error);
      this.showError(error.response?.data?.message || "Failed to save kitchen");
    }
  };

  handleDealSubmit = async () => {
    const { formData, selectedItem } = this.state;
    
    if (!formData.title || !formData.gradient || formData.gradient.length === 0) {
      this.showError("Please fill title and gradient colors");
      return;
    }

    const dealData = {
      title: formData.title,
      subtitle: formData.subtitle || "",
      description: formData.description || "",
      gradientColors: formData.gradient || [],
      image: formData.image || "",
      isActive: formData.isActive !== false,
      startDate: formData.startDate || new Date(),
      endDate: formData.endDate || null,
    };

    try {
      if (selectedItem?._id || selectedItem?.id) {
        const id = selectedItem._id || selectedItem.id;
        await api.put(`/deals/${id}`, dealData);
        this.showSuccess("Deal updated successfully! ✅");
      } else {
        await api.post("/deals", dealData);
        this.showSuccess("Deal created successfully! 🎁");
      }
      await this.loadDeals();
      this.closeModal();
    } catch (error) {
      console.error("Error saving deal:", error);
      this.showError(error.response?.data?.message || "Failed to save deal");
    }
  };

  handleSubmit = () => {
    const { modalType } = this.state;
    if (modalType === "menu") this.handleMenuSubmit();
    else if (modalType === "kitchen") this.handleKitchenSubmit();
    else if (modalType === "deal") this.handleDealSubmit();
  };

  handleDelete = async (type, id) => {
    const itemName =
      type === "menu"
        ? this.state.menuItems.find((item) => item.id === id || item._id === id)?.name
        : type === "deal"
          ? this.state.deals.find((deal) => deal.id === id || deal._id === id)?.title
          : this.state.kitchens.find((kitchen) => kitchen.id === id || kitchen._id === id)?.name;

    if (!window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      return;
    }

    try {
      if (type === "menu") {
        await api.delete(`/menu/${id}`);
        await this.loadMenuItems();
        this.showSuccess(`"${itemName}" removed from menu`);
      } else if (type === "kitchen") {
        // Note: Backend might not have delete endpoint, so we'll deactivate
        await api.put(`/kitchens/${id}`, { isActive: false });
        await this.loadKitchens();
        await this.loadMenuItems();
        this.showSuccess(`Kitchen "${itemName}" deactivated`);
      } else if (type === "deal") {
        await api.delete(`/deals/${id}`);
        await this.loadDeals();
        this.showSuccess(`Deal "${itemName}" deleted`);
      }
    } catch (error) {
      console.error("Error deleting:", error);
      this.showError(error.response?.data?.message || "Failed to delete");
    }
  };

  updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      await this.loadOrders();
      
      const order = this.state.orders.find((o) => o.id === orderId || o._id === orderId);
      const statusMessages = {
        preparing: `Order #${orderId} is being prepared 👨‍🍳`,
        out_for_delivery: `Order #${orderId} is out for delivery 🛵`,
        delivered: `Order #${orderId} delivered to ${order?.customer || "customer"}! ✅`,
      };

      this.showSuccess(statusMessages[newStatus] || `Order status updated`);
    } catch (error) {
      console.error("Error updating order status:", error);
      this.showError(error.response?.data?.message || "Failed to update order status");
    }
  };

  getKitchenName = (kitchenId) => {
    const kitchen = this.state.kitchens.find((k) => k.id === kitchenId || k._id === kitchenId);
    return kitchen ? kitchen.name : "Unknown Kitchen";
  };

  handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/#/admin/login";
    }
  };

  getStatusColor = (status) => {
    const colors = {
      active: "#029962",
      inactive: "#EF4444",
      pending: "#F59E0B",
      preparing: "#3B82F6",
      out_for_delivery: "#8B5CF6",
      delivered: "#029962",
    };
    return colors[status] || "#6B7280";
  };

  getPriorityColor = (priority) => {
    const colors = {
      urgent: "#EF4444",
      high: "#F59E0B",
      normal: "#6B7280",
    };
    return colors[priority] || "#6B7280";
  };

  handleInputChange = (field, value) => {
    this.setState({
      formData: { ...this.state.formData, [field]: value },
      formErrors: { ...this.state.formErrors, [field]: "" },
    });
  };

  formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  renderDashboard = () => {
    const { dashboardStats, orders, kitchens, revenueData } = this.state;
    const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

    return (
      <div className={this.cx("dashboard-content")}>
        <div className={this.cx("page-header")}>
          <div>
            <h1>Dashboard Overview</h1>
            <p className={this.cx("subtitle")}>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className={this.cx("header-actions")}>
            <select
              className={this.cx("date-select")}
              value={this.state.dateRange}
              onChange={(e) => this.setState({ dateRange: e.target.value })}>
              <option value='today'>Today</option>
              <option value='week'>This Week</option>
              <option value='month'>This Month</option>
              <option value='year'>This Year</option>
            </select>
            <button className={this.cx("btn-icon")} title='Refresh'>
              🔄
            </button>
            <button className={this.cx("btn-icon")} title='Download Report'>
              📥
            </button>
          </div>
        </div>

        <div className={this.cx("stats-grid")}>
          <div className={this.cx("stat-card", "primary")}>
            <div className={this.cx("stat-icon-wrapper", "revenue")}>
              <span>💰</span>
            </div>
            <div className={this.cx("stat-content")}>
              <div className={this.cx("stat-value")}>
                {this.formatCurrency(dashboardStats.totalRevenue)}
              </div>
              <div className={this.cx("stat-label")}>Total Revenue</div>
              <div className={this.cx("stat-trend", "positive")}>
                <span>↑ {dashboardStats.monthlyGrowth}%</span> vs last month
              </div>
            </div>
          </div>

          <div className={this.cx("stat-card")}>
            <div className={this.cx("stat-icon-wrapper", "orders")}>
              <span>📦</span>
            </div>
            <div className={this.cx("stat-content")}>
              <div className={this.cx("stat-value")}>
                {dashboardStats.totalOrders.toLocaleString("en-IN")}
              </div>
              <div className={this.cx("stat-label")}>Total Orders</div>
              <div className={this.cx("stat-trend", "positive")}>
                <span>+{dashboardStats.todayOrders}</span> today
              </div>
            </div>
          </div>

          <div className={this.cx("stat-card")}>
            <div className={this.cx("stat-icon-wrapper", "kitchens")}>
              <span>🏠</span>
            </div>
            <div className={this.cx("stat-content")}>
              <div className={this.cx("stat-value")}>{dashboardStats.activeKitchens}</div>
              <div className={this.cx("stat-label")}>Active Kitchens</div>
              <div className={this.cx("stat-trend")}>
                <span>{dashboardStats.repeatCustomers}%</span> repeat orders
              </div>
            </div>
          </div>

          <div className={this.cx("stat-card", "alert")}>
            <div className={this.cx("stat-icon-wrapper", "pending")}>
              <span>⏳</span>
            </div>
            <div className={this.cx("stat-content")}>
              <div className={this.cx("stat-value")}>{dashboardStats.pendingOrders}</div>
              <div className={this.cx("stat-label")}>Pending Orders</div>
              <div className={this.cx("stat-trend", "warning")}>
                <span>Needs attention</span>
              </div>
            </div>
          </div>
        </div>

        <div className={this.cx("metrics-row")}>
          <div className={this.cx("metric-card")}>
            <span className={this.cx("metric-icon")}>⭐</span>
            <div>
              <div className={this.cx("metric-value")}>{dashboardStats.customerSatisfaction}</div>
              <div className={this.cx("metric-label")}>Avg Rating</div>
            </div>
          </div>
          <div className={this.cx("metric-card")}>
            <span className={this.cx("metric-icon")}>🕐</span>
            <div>
              <div className={this.cx("metric-value")}>{dashboardStats.avgDeliveryTime} min</div>
              <div className={this.cx("metric-label")}>Avg Delivery</div>
            </div>
          </div>
          <div className={this.cx("metric-card")}>
            <span className={this.cx("metric-icon")}>❌</span>
            <div>
              <div className={this.cx("metric-value")}>{dashboardStats.cancelRate}%</div>
              <div className={this.cx("metric-label")}>Cancel Rate</div>
            </div>
          </div>
          <div className={this.cx("metric-card")}>
            <span className={this.cx("metric-icon")}>🔥</span>
            <div>
              <div className={this.cx("metric-value")}>{dashboardStats.peakHours}</div>
              <div className={this.cx("metric-label")}>Peak Hours</div>
            </div>
          </div>
        </div>

        <div className={this.cx("charts-grid")}>
          <div className={this.cx("chart-card", "wide")}>
            <div className={this.cx("chart-header")}>
              <h3>Revenue Trend</h3>
              <span className={this.cx("chart-period")}>Last 7 days</span>
            </div>
            <div className={this.cx("bar-chart")}>
              {revenueData.map((data, index) => (
                <div key={index} className={this.cx("bar-item")}>
                  <div className={this.cx("bar-wrapper")}>
                    <div
                      className={this.cx("bar")}
                      style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}>
                      <span className={this.cx("bar-value")}>
                        {this.formatCurrency(data.revenue)}
                      </span>
                    </div>
                  </div>
                  <span className={this.cx("bar-label")}>{data.day}</span>
                  <span className={this.cx("bar-orders")}>{data.orders} orders</span>
                </div>
              ))}
            </div>
          </div>

          <div className={this.cx("chart-card")}>
            <div className={this.cx("chart-header")}>
              <h3>Top Kitchens</h3>
              <button className={this.cx("view-all")}>View All →</button>
            </div>
            <div className={this.cx("top-list")}>
              {kitchens
                .filter((k) => k.status === "active")
                .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
                .slice(0, 4)
                .map((kitchen, index) => (
                  <div key={kitchen._id || kitchen.id} className={this.cx("top-item")}>
                    <div className={this.cx("top-rank")}>#{index + 1}</div>
                    <div className={this.cx("top-info")}>
                      <div className={this.cx("top-name")}>{kitchen.name}</div>
                      <div className={this.cx("top-meta")}>
                        {kitchen.cuisine} • {kitchen.location}
                      </div>
                    </div>
                    <div className={this.cx("top-stats")}>
                      <div className={this.cx("top-revenue")}>
                        {this.formatCurrency(kitchen.revenue || 0)}
                      </div>
                      <div className={this.cx("top-rating")}>⭐ {kitchen.rating || 0}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className={this.cx("activity-section")}>
          <div className={this.cx("chart-header")}>
            <h3>Recent Orders</h3>
            <button className={this.cx("view-all")} onClick={() => this.setActiveTab("orders")}>
              View All Orders →
            </button>
          </div>
          <div className={this.cx("orders-table")}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Kitchen</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id || order.id}>
                    <td className={this.cx("order-id")}>#{order._id || order.id}</td>
                    <td>{order.customer || order.user?.firstName || "N/A"}</td>
                    <td>{order.kitchen || order.kitchenId?.name || "N/A"}</td>
                    <td className={this.cx("amount")}>{this.formatCurrency(order.totalAmount || order.total || 0)}</td>
                    <td>
                      <span
                        className={this.cx("status-badge")}
                        style={{ backgroundColor: this.getStatusColor(order.status) }}>
                        {order.status?.replace("_", " ") || "pending"}
                      </span>
                    </td>
                    <td className={this.cx("time")}>
                      {order.createdAt || order.orderTime
                        ? new Date(order.createdAt || order.orderTime).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  renderMenuManagement = () => {
    const { searchTerm, menuItems } = this.state;
    const filteredMenuItems = menuItems.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        this.getKitchenName(item.kitchenId || item.kitchen)?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className={this.cx("section-content")}>
        <div className={this.cx("page-header")}>
          <div>
            <h1>Menu Management</h1>
            <p className={this.cx("subtitle")}>
              {menuItems.length} vegetarian items • {menuItems.filter((i) => i.available).length}{" "}
              available
            </p>
          </div>
          <div className={this.cx("header-actions")}>
            <div className={this.cx("search-box")}>
              <span>🔍</span>
              <input
                type='text'
                placeholder='Search menu items...'
                value={searchTerm}
                onChange={(e) => this.setSearchTerm(e.target.value)}
              />
            </div>
            <button className={this.cx("btn-primary")} onClick={() => this.openModal("menu")}>
              + Add Item
            </button>
          </div>
        </div>

        <div className={this.cx("menu-grid")}>
          {filteredMenuItems.length === 0 ? (
            <div className={this.cx("empty-state")}>
              <span>🍽️</span>
              <h3>No items found</h3>
              <p>Try adjusting your search or add a new menu item</p>
            </div>
          ) : (
            filteredMenuItems.map((item) => (
              <div key={item._id || item.id} className={this.cx("menu-card")}>
                <div className={this.cx("menu-image")}>
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=🥗";
                    }}
                  />
                  <div className={this.cx("image-overlay")}>
                    <span
                      className={this.cx(
                        "availability",
                        item.available ? "available" : "unavailable"
                      )}>
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                    <span className={this.cx("veg-badge")}>🟢 Pure Veg</span>
                  </div>
                </div>
                <div className={this.cx("menu-body")}>
                  <div className={this.cx("menu-header")}>
                    <h3>{item.name}</h3>
                    <span className={this.cx("menu-price")}>{this.formatCurrency(item.price)}</span>
                  </div>
                  <p className={this.cx("menu-desc")}>{item.description}</p>
                  <div className={this.cx("menu-meta")}>
                    <span className={this.cx("kitchen-tag")}>
                      🏠 {this.getKitchenName(item.kitchenId || item.kitchen)}
                    </span>
                    <span className={this.cx("category-tag")}>{item.category}</span>
                  </div>
                  <div className={this.cx("menu-stats")}>
                    <div className={this.cx("stat-item")}>
                      <span className={this.cx("stat-label")}>Popularity</span>
                      <div className={this.cx("progress-bar")}>
                        <div
                          className={this.cx("progress-fill")}
                          style={{ width: `${item.popularity}%` }}></div>
                      </div>
                      <span className={this.cx("stat-value")}>{item.popularity}%</span>
                    </div>
                    <div className={this.cx("stat-row")}>
                      <span>📦 {item.orderCount} orders</span>
                      <span>⏱️ {item.preparationTime} min</span>
                    </div>
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className={this.cx("tags")}>
                      {item.tags.map((tag, i) => (
                        <span key={i} className={this.cx("tag")}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className={this.cx("menu-actions")}>
                  <button
                    className={this.cx("btn-edit")}
                    onClick={() => this.openModal("menu", item)}>
                    ✏️ Edit
                  </button>
                  <button
                    className={this.cx("btn-delete")}
                    onClick={() => this.handleDelete("menu", item._id || item.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  renderKitchenManagement = () => {
    const { searchTerm, kitchens } = this.state;
    const filteredKitchens = kitchens.filter(
      (kitchen) =>
        kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kitchen.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kitchen.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className={this.cx("section-content")}>
        <div className={this.cx("page-header")}>
          <div>
            <h1>Kitchen Partners</h1>
            <p className={this.cx("subtitle")}>
              {kitchens.filter((k) => k.status === "active").length} active •{" "}
              {kitchens.filter((k) => k.isOnline).length} online now
            </p>
          </div>
          <div className={this.cx("header-actions")}>
            <div className={this.cx("search-box")}>
              <span>🔍</span>
              <input
                type='text'
                placeholder='Search kitchens...'
                value={searchTerm}
                onChange={(e) => this.setSearchTerm(e.target.value)}
              />
            </div>
            <button className={this.cx("btn-primary")} onClick={() => this.openModal("kitchen")}>
              + Add Kitchen
            </button>
          </div>
        </div>

        <div className={this.cx("kitchen-grid")}>
          {filteredKitchens.length === 0 ? (
            <div className={this.cx("empty-state")}>
              <span>🏠</span>
              <h3>No kitchens found</h3>
              <p>Try adjusting your search or add a new kitchen partner</p>
            </div>
          ) : (
            filteredKitchens.map((kitchen) => (
              <div key={kitchen._id || kitchen.id} className={this.cx("kitchen-card")}>
                <div className={this.cx("kitchen-header")}>
                  <div className={this.cx("kitchen-title")}>
                    <h3>{kitchen.name}</h3>
                    <div className={this.cx("kitchen-badges")}>
                      <span
                        className={this.cx(
                          "status-dot",
                          kitchen.isOnline ? "online" : "offline"
                        )}></span>
                      <span
                        className={this.cx("status-badge")}
                        style={{ backgroundColor: this.getStatusColor(kitchen.status) }}>
                        {kitchen.status}
                      </span>
                    </div>
                  </div>
                  <div className={this.cx("kitchen-rating")}>
                    <span className={this.cx("rating-star")}>⭐</span>
                    <span className={this.cx("rating-value")}>{kitchen.rating}</span>
                  </div>
                </div>

                <div className={this.cx("kitchen-info")}>
                  <div className={this.cx("info-row")}>
                    <span>🍳</span>
                    <span>{kitchen.cuisine}</span>
                  </div>
                  <div className={this.cx("info-row")}>
                    <span>📍</span>
                    <span>{kitchen.location}</span>
                  </div>
                  <div className={this.cx("info-row")}>
                    <span>📞</span>
                    <span>{kitchen.phone}</span>
                  </div>
                  <div className={this.cx("info-row")}>
                    <span>📧</span>
                    <span>{kitchen.email}</span>
                  </div>
                </div>

                <div className={this.cx("kitchen-metrics")}>
                  <div className={this.cx("metric")}>
                    <div className={this.cx("metric-value")}>
                      {this.formatCurrency(kitchen.revenue)}
                    </div>
                    <div className={this.cx("metric-label")}>Revenue</div>
                  </div>
                  <div className={this.cx("metric")}>
                    <div className={this.cx("metric-value")}>{kitchen.orders}</div>
                    <div className={this.cx("metric-label")}>Orders</div>
                  </div>
                  <div className={this.cx("metric")}>
                    <div className={this.cx("metric-value")}>{kitchen.completionRate}%</div>
                    <div className={this.cx("metric-label")}>Completion</div>
                  </div>
                </div>

                <div className={this.cx("kitchen-footer")}>
                  <span className={this.cx("join-date")}>
                    Joined {new Date(kitchen.joinDate).toLocaleDateString("en-IN")}
                  </span>
                  <div className={this.cx("action-buttons")}>
                    <button
                      className={this.cx("btn-sm", "edit")}
                      onClick={() => this.openModal("kitchen", kitchen)}>
                      Edit
                    </button>
                    <button
                      className={this.cx("btn-sm", "delete")}
                      onClick={() => this.handleDelete("kitchen", kitchen._id || kitchen.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  renderOrderManagement = () => {
    const { orders, searchTerm } = this.state;
    const filteredOrders = searchTerm
      ? orders.filter(
          (order) =>
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.kitchen.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toString().includes(searchTerm)
        )
      : orders;

    const statusCounts = {
      pending: orders.filter((o) => o.status === "pending").length,
      preparing: orders.filter((o) => o.status === "preparing").length,
      out_for_delivery: orders.filter((o) => o.status === "out_for_delivery").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };

    return (
      <div className={this.cx("section-content")}>
        <div className={this.cx("page-header")}>
          <div>
            <h1>Order Management</h1>
            <p className={this.cx("subtitle")}>
              {orders.length} total orders • {statusCounts.pending} pending
            </p>
          </div>
          <div className={this.cx("header-actions")}>
            <div className={this.cx("search-box")}>
              <span>🔍</span>
              <input
                type='text'
                placeholder='Search orders...'
                value={searchTerm}
                onChange={(e) => this.setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={this.cx("order-status-tabs")}>
          <button className={this.cx("status-tab", "all", "active")}>
            All <span>{orders.length}</span>
          </button>
          <button className={this.cx("status-tab", "pending")}>
            Pending <span>{statusCounts.pending}</span>
          </button>
          <button className={this.cx("status-tab", "preparing")}>
            Preparing <span>{statusCounts.preparing}</span>
          </button>
          <button className={this.cx("status-tab", "delivery")}>
            Out for Delivery <span>{statusCounts.out_for_delivery}</span>
          </button>
          <button className={this.cx("status-tab", "delivered")}>
            Delivered <span>{statusCounts.delivered}</span>
          </button>
        </div>

        <div className={this.cx("orders-list")}>
          {filteredOrders.length === 0 ? (
            <div className={this.cx("empty-state")}>
              <span>📦</span>
              <h3>No orders found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order._id || order.id} className={this.cx("order-card")}>
                <div className={this.cx("order-header")}>
                  <div className={this.cx("order-id-section")}>
                    <span className={this.cx("order-number")}>#{order._id || order.id}</span>
                    <span
                      className={this.cx("priority-badge")}
                      style={{ backgroundColor: this.getPriorityColor(order.priority) }}>
                      {order.priority}
                    </span>
                  </div>
                  <span
                    className={this.cx("order-status")}
                    style={{ backgroundColor: this.getStatusColor(order.status) }}>
                    {order.status.replace("_", " ")}
                  </span>
                </div>

                <div className={this.cx("order-body")}>
                  <div className={this.cx("customer-section")}>
                    <h4>👤 {order.customer}</h4>
                    <p>{order.customerPhone}</p>
                    <p>{order.customerEmail}</p>
                    <p className={this.cx("address")}>📍 {order.address}</p>
                  </div>

                  <div className={this.cx("order-details")}>
                    <div className={this.cx("kitchen-info")}>
                      <strong>🏠 {order.kitchen}</strong>
                    </div>
                    <div className={this.cx("items-list")}>
                      {order.items.map((item, i) => (
                        <div key={i} className={this.cx("order-item")}>
                          <span>
                            {item.name} x{item.qty}
                          </span>
                          <span>{this.formatCurrency(item.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className={this.cx("order-total")}>
                      <span>Total</span>
                      <span>{this.formatCurrency(order.total)}</span>
                    </div>
                    {order.tip > 0 && (
                      <div className={this.cx("order-tip")}>
                        <span>Tip</span>
                        <span>{this.formatCurrency(order.tip)}</span>
                      </div>
                    )}
                    <div className={this.cx("payment-method")}>💳 {order.paymentMethod}</div>
                  </div>

                  <div className={this.cx("time-section")}>
                    <div>
                      <strong>Order Time</strong>
                      <p>{new Date(order.orderTime).toLocaleString("en-IN")}</p>
                    </div>
                    {order.deliveryTime && (
                      <div>
                        <strong>Delivered At</strong>
                        <p>{new Date(order.deliveryTime).toLocaleString("en-IN")}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className={this.cx("order-actions")}>
                  {order.status === "pending" && (
                    <button
                      className={this.cx("action-btn", "preparing")}
                      onClick={() => this.updateOrderStatus(order._id || order.id, "preparing")}>
                      👨‍🍳 Start Preparing
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button
                      className={this.cx("action-btn", "delivery")}
                      onClick={() => this.updateOrderStatus(order._id || order.id, "out_for_delivery")}>
                      🛵 Out for Delivery
                    </button>
                  )}
                  {order.status === "out_for_delivery" && (
                    <button
                      className={this.cx("action-btn", "delivered")}
                      onClick={() => this.updateOrderStatus(order._id || order.id, "delivered")}>
                      ✅ Mark Delivered
                    </button>
                  )}
                  <button className={this.cx("action-btn", "secondary")}>📞 Call Customer</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  renderUserManagement = () => {
    const { users, searchTerm } = this.state;
    const filteredUsers = searchTerm
      ? users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users;

    return (
      <div className={this.cx("section-content")}>
        <div className={this.cx("page-header")}>
          <div>
            <h1>Customer Management</h1>
            <p className={this.cx("subtitle")}>
              {users.length} registered customers •{" "}
              {this.formatCurrency(users.reduce((sum, u) => sum + u.totalSpent, 0))} total spent
            </p>
          </div>
          <div className={this.cx("header-actions")}>
            <div className={this.cx("search-box")}>
              <span>🔍</span>
              <input
                type='text'
                placeholder='Search customers...'
                value={searchTerm}
                onChange={(e) => this.setSearchTerm(e.target.value)}
              />
            </div>
            <button className={this.cx("btn-secondary")}>📥 Export</button>
          </div>
        </div>

        <div className={this.cx("users-table-wrapper")}>
          <table className={this.cx("users-table")}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Loyalty Points</th>
                <th>Favorite Kitchen</th>
                <th>Last Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id || user.id}>
                  <td>
                    <div className={this.cx("user-info")}>
                      <div className={this.cx("user-avatar")}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className={this.cx("user-name")}>{user.name}</div>
                        <div className={this.cx("user-since")}>
                          Since {new Date(user.joinDate).toLocaleDateString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={this.cx("contact-info")}>
                      <div>{user.email}</div>
                      <div>{user.phone}</div>
                    </div>
                  </td>
                  <td className={this.cx("center")}>{user.totalOrders}</td>
                  <td className={this.cx("amount")}>{this.formatCurrency(user.totalSpent)}</td>
                  <td className={this.cx("center")}>
                    <span className={this.cx("loyalty-badge")}>🏆 {user.loyaltyPoints}</span>
                  </td>
                  <td>{user.favoriteKitchen}</td>
                  <td>
                    {user.lastOrder
                      ? new Date(user.lastOrder).toLocaleDateString("en-IN")
                      : "Never"}
                  </td>
                  <td>
                    <span
                      className={this.cx("status-badge")}
                      style={{ backgroundColor: this.getStatusColor(user.status) }}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  renderDealsManagement = () => {
    const { deals, searchTerm, loadingDeals } = this.state;
    const filteredDeals = searchTerm
      ? deals.filter(
          (deal) =>
            deal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : deals;

    return (
      <div className={this.cx("section-content")}>
        <div className={this.cx("page-header")}>
          <div>
            <h1>Exclusive Deals</h1>
            <p className={this.cx("subtitle")}>
              {deals.length} total deals • {deals.filter((d) => d.isActive).length} active
            </p>
          </div>
          <div className={this.cx("header-actions")}>
            <div className={this.cx("search-box")}>
              <span>🔍</span>
              <input
                type='text'
                placeholder='Search deals...'
                value={searchTerm}
                onChange={(e) => this.setSearchTerm(e.target.value)}
              />
            </div>
            <button className={this.cx("btn-primary")} onClick={() => this.openModal("deal")}>
              + Add Deal
            </button>
          </div>
        </div>

        {loadingDeals ? (
          <div className={this.cx("empty-state")}>
            <span>⏳</span>
            <h3>Loading deals...</h3>
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className={this.cx("empty-state")}>
            <span>🎁</span>
            <h3>No deals found</h3>
            <p>Try adjusting your search or add a new exclusive deal</p>
          </div>
        ) : (
          <div className={this.cx("deals-grid")}>
            {filteredDeals.map((deal) => (
              <div key={deal._id || deal.id} className={this.cx("deal-card")}>
                <div
                  className={this.cx("deal-gradient")}
                  style={{
                    background: deal.gradientColors
                      ? `linear-gradient(135deg, ${deal.gradientColors.join(", ")})`
                      : "linear-gradient(135deg, #f97316, #fb923c)",
                  }}>
                  {deal.image && (
                    <img src={deal.image} alt={deal.title} className={this.cx("deal-image")} />
                  )}
                  <div className={this.cx("deal-content")}>
                    <h3>{deal.title}</h3>
                    {deal.subtitle && <p className={this.cx("deal-subtitle")}>{deal.subtitle}</p>}
                    {deal.description && (
                      <p className={this.cx("deal-description")}>{deal.description}</p>
                    )}
                  </div>
                </div>
                <div className={this.cx("deal-body")}>
                  <div className={this.cx("deal-meta")}>
                    <span
                      className={this.cx("status-badge")}
                      style={{
                        backgroundColor: deal.isActive ? "#029962" : "#6B7280",
                      }}>
                      {deal.isActive ? "Active" : "Inactive"}
                    </span>
                    {deal.startDate && (
                      <span className={this.cx("deal-date")}>
                        Starts: {new Date(deal.startDate).toLocaleDateString("en-IN")}
                      </span>
                    )}
                    {deal.endDate && (
                      <span className={this.cx("deal-date")}>
                        Ends: {new Date(deal.endDate).toLocaleDateString("en-IN")}
                      </span>
                    )}
                  </div>
                  <div className={this.cx("deal-actions")}>
                    <button
                      className={this.cx("btn-edit")}
                      onClick={() => this.openModal("deal", deal)}>
                      ✏️ Edit
                    </button>
                    <button
                      className={this.cx("btn-delete")}
                      onClick={() => this.handleDelete("deal", deal._id || deal.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  renderSettings = () => {
    const { settings } = this.state;

    return (
      <div className={this.cx("section-content")}>
        <div className={this.cx("page-header")}>
          <div>
            <h1>Platform Settings</h1>
            <p className={this.cx("subtitle")}>Configure your platform preferences</p>
          </div>
        </div>

        <div className={this.cx("settings-grid")}>
          <div className={this.cx("settings-card")}>
            <h3>💰 Pricing & Fees</h3>
            <div className={this.cx("setting-item")}>
              <label>Platform Fee (%)</label>
              <input type='number' value={settings.platformFee} readOnly />
            </div>
            <div className={this.cx("setting-item")}>
              <label>Minimum Order Amount (₹)</label>
              <input type='number' value={settings.minOrderAmount} readOnly />
            </div>
          </div>

          <div className={this.cx("settings-card")}>
            <h3>🚚 Delivery Settings</h3>
            <div className={this.cx("setting-item")}>
              <label>Delivery Radius (km)</label>
              <input type='number' value={settings.deliveryRadius} readOnly />
            </div>
            <div className={this.cx("setting-item")}>
              <label>Max Preparation Time (min)</label>
              <input type='number' value={settings.maxPrepTime} readOnly />
            </div>
            <div className={this.cx("setting-toggle")}>
              <label>Auto-assign Drivers</label>
              <input type='checkbox' checked={settings.autoAssignDrivers} readOnly />
            </div>
          </div>

          <div className={this.cx("settings-card")}>
            <h3>🔔 Notifications</h3>
            <div className={this.cx("setting-toggle")}>
              <label>Low Stock Alerts</label>
              <input type='checkbox' checked={settings.notifyLowStock} readOnly />
            </div>
            <div className={this.cx("setting-toggle")}>
              <label>Email Notifications</label>
              <input type='checkbox' checked={settings.emailNotifications} readOnly />
            </div>
            <div className={this.cx("setting-toggle")}>
              <label>SMS Notifications</label>
              <input type='checkbox' checked={settings.smsNotifications} readOnly />
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderModal = () => {
    const { modalVisible, modalType, formData, kitchens, selectedItem, formErrors } = this.state;

    if (!modalVisible) return null;

    return (
      <div className={`${this.cx("modal-overlay")} ${modalVisible ? this.cx("show") : ""}`}>
        <div className={this.cx("modal-content")}>
          <div className={this.cx("modal-header")}>
            <h3>
              {selectedItem ? "Edit" : "Add New"}{" "}
              {modalType === "menu"
                ? "Menu Item"
                : modalType === "deal"
                  ? "Deal"
                  : "Kitchen Partner"}
            </h3>
            <button className={this.cx("close-btn")} onClick={this.closeModal}>
              ✕
            </button>
          </div>

          <div className={this.cx("modal-body")}>
            {modalType === "deal" ? (
              <div className={this.cx("form-grid")}>
                <div className={this.cx("form-group")}>
                  <label>
                    Title <span className={this.cx("required")}>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='e.g., Premium Subscription'
                    value={formData.title || ""}
                    onChange={(e) => this.handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className={this.cx("form-group")}>
                  <label>Subtitle</label>
                  <input
                    type='text'
                    placeholder='e.g., Save up to 60% for 6 months'
                    value={formData.subtitle || ""}
                    onChange={(e) => this.handleInputChange("subtitle", e.target.value)}
                  />
                </div>

                <div className={this.cx("form-group", "full-width")}>
                  <label>Description</label>
                  <textarea
                    placeholder='Deal description (optional)'
                    value={formData.description || ""}
                    onChange={(e) => this.handleInputChange("description", e.target.value)}
                    rows='3'></textarea>
                </div>

                <div className={this.cx("form-group", "full-width")}>
                  <label>
                    Gradient Colors (comma separated) <span className={this.cx("required")}>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='e.g., #f97316, #fb923c'
                    value={formData.gradient ? formData.gradient.join(", ") : ""}
                    onChange={(e) => {
                      const colors = e.target.value
                        .split(",")
                        .map((c) => c.trim())
                        .filter((c) => c);
                      this.handleInputChange("gradient", colors);
                    }}
                  />
                </div>

                <div className={this.cx("form-group")}>
                  <label>Image URL (optional)</label>
                  <input
                    type='url'
                    placeholder='https://example.com/image.jpg'
                    value={formData.image || ""}
                    onChange={(e) => this.handleInputChange("image", e.target.value)}
                  />
                </div>

                <div className={this.cx("form-group")}>
                  <label>Start Date (optional)</label>
                  <input
                    type='date'
                    value={
                      formData.startDate
                        ? new Date(formData.startDate).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      this.handleInputChange("startDate", e.target.value ? new Date(e.target.value) : null)
                    }
                  />
                </div>

                <div className={this.cx("form-group")}>
                  <label>End Date (optional)</label>
                  <input
                    type='date'
                    value={
                      formData.endDate ? new Date(formData.endDate).toISOString().split("T")[0] : ""
                    }
                    onChange={(e) =>
                      this.handleInputChange("endDate", e.target.value ? new Date(e.target.value) : null)
                    }
                  />
                </div>

                <div className={this.cx("form-group", "checkbox")}>
                  <label>
                    <input
                      type='checkbox'
                      checked={formData.isActive !== false}
                      onChange={(e) => this.handleInputChange("isActive", e.target.checked)}
                    />
                    Active
                  </label>
                </div>
              </div>
            ) : modalType === "menu" ? (
              <div className={this.cx("form-grid")}>
                <div className={this.cx("form-group")}>
                  <label>
                    Item Name <span className={this.cx("required")}>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='e.g., Paneer Tikka'
                    value={formData.name}
                    onChange={(e) => this.handleInputChange("name", e.target.value)}
                    className={formErrors.name ? this.cx("error") : ""}
                  />
                  {formErrors.name && (
                    <span className={this.cx("error-text")}>{formErrors.name}</span>
                  )}
                </div>

                <div className={this.cx("form-group")}>
                  <label>
                    Price (₹) <span className={this.cx("required")}>*</span>
                  </label>
                  <input
                    type='number'
                    placeholder='e.g., 249'
                    value={formData.price}
                    onChange={(e) => this.handleInputChange("price", e.target.value)}
                    className={formErrors.price ? this.cx("error") : ""}
                  />
                  {formErrors.price && (
                    <span className={this.cx("error-text")}>{formErrors.price}</span>
                  )}
                </div>

                <div className={this.cx("form-group")}>
                  <label>
                    Kitchen <span className={this.cx("required")}>*</span>
                  </label>
                  <select
                    value={formData.kitchenId}
                    onChange={(e) => this.handleInputChange("kitchenId", e.target.value)}
                    className={formErrors.kitchenId ? this.cx("error") : ""}>
                    <option value=''>Select Kitchen</option>
                    {kitchens
                      .filter((k) => k.status === "active")
                      .map((kitchen) => (
                        <option key={kitchen._id || kitchen.id} value={kitchen._id || kitchen.id}>
                          {kitchen.name}
                        </option>
                      ))}
                  </select>
                  {formErrors.kitchenId && (
                    <span className={this.cx("error-text")}>{formErrors.kitchenId}</span>
                  )}
                </div>

                <div className={this.cx("form-group")}>
                  <label>
                    Category <span className={this.cx("required")}>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='e.g., Main Course, Snacks'
                    value={formData.category}
                    onChange={(e) => this.handleInputChange("category", e.target.value)}
                    className={formErrors.category ? this.cx("error") : ""}
                  />
                  {formErrors.category && (
                    <span className={this.cx("error-text")}>{formErrors.category}</span>
                  )}
                </div>

                <div className={this.cx("form-group")}>
                  <label>Preparation Time (minutes)</label>
                  <input
                    type='number'
                    placeholder='e.g., 25'
                    value={formData.preparationTime}
                    onChange={(e) => this.handleInputChange("preparationTime", e.target.value)}
                  />
                </div>

                <div className={this.cx("form-group")}>
                  <label>Image URL</label>
                  <input
                    type='url'
                    placeholder='https://...'
                    value={formData.image}
                    onChange={(e) => this.handleInputChange("image", e.target.value)}
                  />
                </div>

                <div className={this.cx("form-group", "full-width")}>
                  <label>Description</label>
                  <textarea
                    placeholder='Describe the dish...'
                    value={formData.description}
                    onChange={(e) => this.handleInputChange("description", e.target.value)}
                    rows='3'></textarea>
                </div>

                <div className={this.cx("form-group", "full-width")}>
                  <label>Tags (comma separated)</label>
                  <input
                    type='text'
                    placeholder='e.g., bestseller, spicy, healthy'
                    value={formData.tags}
                    onChange={(e) => this.handleInputChange("tags", e.target.value)}
                  />
                </div>

                <div className={this.cx("form-group", "checkbox")}>
                  <label>
                    <input
                      type='checkbox'
                      checked={formData.available}
                      onChange={(e) => this.handleInputChange("available", e.target.checked)}
                    />
                    Available for ordering
                  </label>
                </div>
              </div>
            ) : (
              <div className={this.cx("form-grid")}>
                <div className={this.cx("form-group")}>
                  <label>
                    Kitchen Name <span className={this.cx("required")}>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='e.g., Shree Krishna Bhojanalaya'
                    value={formData.name}
                    onChange={(e) => this.handleInputChange("name", e.target.value)}
                    className={formErrors.name ? this.cx("error") : ""}
                  />
                  {formErrors.name && (
                    <span className={this.cx("error-text")}>{formErrors.name}</span>
                  )}
                </div>

                <div className={this.cx("form-group")}>
                  <label>
                    Cuisine Type <span className={this.cx("required")}>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='e.g., North Indian, South Indian'
                    value={formData.cuisine}
                    onChange={(e) => this.handleInputChange("cuisine", e.target.value)}
                    className={formErrors.cuisine ? this.cx("error") : ""}
                  />
                  {formErrors.cuisine && (
                    <span className={this.cx("error-text")}>{formErrors.cuisine}</span>
                  )}
                </div>

                <div className={this.cx("form-group", "full-width")}>
                  <label>
                    Location <span className={this.cx("required")}>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='e.g., Karol Bagh, New Delhi'
                    value={formData.location}
                    onChange={(e) => this.handleInputChange("location", e.target.value)}
                    className={formErrors.location ? this.cx("error") : ""}
                  />
                  {formErrors.location && (
                    <span className={this.cx("error-text")}>{formErrors.location}</span>
                  )}
                </div>

                <div className={this.cx("form-group")}>
                  <label>Phone Number</label>
                  <input
                    type='tel'
                    placeholder='+91-9876543210'
                    value={formData.phone}
                    onChange={(e) => this.handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className={this.cx("form-group")}>
                  <label>Email Address</label>
                  <input
                    type='email'
                    placeholder='kitchen@gmail.com'
                    value={formData.email}
                    onChange={(e) => this.handleInputChange("email", e.target.value)}
                    className={formErrors.email ? this.cx("error") : ""}
                  />
                  {formErrors.email && (
                    <span className={this.cx("error-text")}>{formErrors.email}</span>
                  )}
                </div>

                <div className={this.cx("form-group")}>
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => this.handleInputChange("status", e.target.value)}>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className={this.cx("modal-footer")}>
            <button className={this.cx("btn-cancel")} onClick={this.closeModal}>
              Cancel
            </button>
            <button className={this.cx("btn-submit")} onClick={this.handleSubmit}>
              {selectedItem ? "Update" : "Add"}{" "}
              {modalType === "menu" ? "Item" : modalType === "deal" ? "Deal" : "Kitchen"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  renderNotifications = () => {
    const { notifications } = this.state;

    return (
      <div className={this.cx("notifications-container")}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={this.cx("notification", `notification-${notification.type}`)}>
            <div className={this.cx("notification-icon")}>
              {notification.type === "success" && "✅"}
              {notification.type === "error" && "❌"}
              {notification.type === "warning" && "⚠️"}
              {notification.type === "info" && "ℹ️"}
            </div>
            <div className={this.cx("notification-content")}>
              <p>{notification.message}</p>
              <span className={this.cx("notification-time")}>
                {notification.timestamp.toLocaleTimeString("en-IN")}
              </span>
            </div>
            <button
              className={this.cx("notification-close")}
              onClick={() => this.removeNotification(notification.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { activeTab, sidebarCollapsed } = this.state;

    return (
      <div className={this.cx("admin-dashboard")}>
        <aside className={this.cx("sidebar", sidebarCollapsed ? "collapsed" : "")}>
          <div className={this.cx("sidebar-header")}>
            <div className={this.cx("logo")}>
              <img src='/images/logo2.png' alt='Raavito' className={this.cx("logo-text")} />
            </div>
            <button className={this.cx("toggle-btn")} onClick={this.toggleSidebar}>
              {sidebarCollapsed ? "→" : "←"}
            </button>
          </div>

          <nav className={this.cx("nav-menu")}>
            <button
              className={this.cx("nav-item", activeTab === "dashboard" ? "active" : "")}
              onClick={() => this.setActiveTab("dashboard")}>
              <span className={this.cx("nav-icon")}>📊</span>
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>

            <button
              className={this.cx("nav-item", activeTab === "menu" ? "active" : "")}
              onClick={() => this.setActiveTab("menu")}>
              <span className={this.cx("nav-icon")}>🥗</span>
              {!sidebarCollapsed && <span>Menu Items</span>}
            </button>

            <button
              className={this.cx("nav-item", activeTab === "kitchens" ? "active" : "")}
              onClick={() => this.setActiveTab("kitchens")}>
              <span className={this.cx("nav-icon")}>🏠</span>
              {!sidebarCollapsed && <span>Kitchens</span>}
            </button>

            <button
              className={this.cx("nav-item", activeTab === "orders" ? "active" : "")}
              onClick={() => this.setActiveTab("orders")}>
              <span className={this.cx("nav-icon")}>📦</span>
              {!sidebarCollapsed && <span>Orders</span>}
              <span className={this.cx("badge")}>
                {this.state.orders.filter((o) => o.status === "pending").length}
              </span>
            </button>

            <button
              className={this.cx("nav-item", activeTab === "users" ? "active" : "")}
              onClick={() => this.setActiveTab("users")}>
              <span className={this.cx("nav-icon")}>👥</span>
              {!sidebarCollapsed && <span>Customers</span>}
            </button>

            <button
              className={this.cx("nav-item", activeTab === "deals" ? "active" : "")}
              onClick={() => {
                this.setActiveTab("deals");
                if (this.state.deals.length === 0) this.loadDeals();
              }}>
              <span className={this.cx("nav-icon")}>🎁</span>
              {!sidebarCollapsed && <span>Deals</span>}
            </button>

            <button
              className={this.cx("nav-item", activeTab === "settings" ? "active" : "")}
              onClick={() => this.setActiveTab("settings")}>
              <span className={this.cx("nav-icon")}>⚙️</span>
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
          </nav>

          <div className={this.cx("sidebar-footer")}>
            <div className={this.cx("admin-profile")}>
              <div className={this.cx("admin-avatar")}>👤</div>
              {!sidebarCollapsed && (
                <div className={this.cx("admin-info")}>
                  <div className={this.cx("admin-name")}>
                    {(() => {
                      try {
                        const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
                        const fullName = [adminUser.firstName, adminUser.lastName].filter(Boolean).join(" ");
                        return fullName || adminUser.mobile || "Admin";
                      } catch {
                        return "Admin";
                      }
                    })()}
                  </div>
                  <div className={this.cx("admin-role")}>Super Admin</div>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <button className={this.cx("logout-btn")} onClick={this.handleLogout}>
                🚪 Logout
              </button>
            )}
          </div>
        </aside>

        <main className={this.cx("main-content")}>
          {activeTab === "dashboard" && this.renderDashboard()}
          {activeTab === "menu" && this.renderMenuManagement()}
          {activeTab === "kitchens" && this.renderKitchenManagement()}
          {activeTab === "orders" && this.renderOrderManagement()}
          {activeTab === "users" && this.renderUserManagement()}
          {activeTab === "deals" && this.renderDealsManagement()}
          {activeTab === "settings" && this.renderSettings()}
        </main>

        {this.renderModal()}
        {this.renderNotifications()}
      </div>
    );
  }
}

export default AdminDashboard;
