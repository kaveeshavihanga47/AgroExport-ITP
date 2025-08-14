# 🌾 AgroExport - Export Operations Management System

## 📌 Project Overview
**AgroExport** is a comprehensive export operations management system designed for a client company dealing with **pepper, coconut, corn, and cashew**.  
It streamlines the entire export process — from receiving orders, checking inventory, calculating costs, generating shipping documents, tracking shipments, to handling returns.

This system integrates seamlessly with:
- **Order Management System** (for receiving orders)
- **Inventory Management System** (for checking stock)
- **Supplier Management System** (for retrieving customer details)
- **Financial Management System** (for export costs and billing)

---

## 🎯 Objectives
- Automate and centralize export operations.
- Provide real-time visibility of inventory and shipments.
- Improve accuracy in customer and financial records.
- Reduce delays in the export process.
- Enable customers to track their shipments.

---

## 👥 System Users

### **1. Admin (Company Staff)**
Roles include Export Manager, Inventory Manager, Finance Officer.

**Admin Features:**
- **User Management:** Create, edit, and delete staff accounts.
- **Order Management:** Approve, reject, or hold customer orders.
- **Inventory Management:** Add new stock, update stock levels, remove expired/damaged products.
- **Customer Management:** Add and update customer details.
- **Finance Management:** Record export costs, generate invoices.
- **Shipment Management:** Add shipment tracking numbers, update delivery status, process returns.

---

### **2. Customer**
Customers are businesses or individuals ordering products for export.

**Customer Features:**
- **Profile Management:** View and edit personal/company details.
- **Place Orders:** Select products, quantities, and delivery dates.
- **Order Tracking:** View order status and shipment progress.
- **Download Documents:** Access shipping and invoice documents.
- **Returns:** Request returns and track the process.

---

## 🔄 Workflow

1. **Customer places order** via Customer Portal.
2. **System checks inventory** for product availability.
   - If available → reserve stock.
   - If not → mark as “On Hold”.
3. **Customer details retrieved** from Supplier Management System.
4. **Export costs calculated** by Financial Management System.
5. **Shipping documents generated** and shipment tracking created.
6. **Customer tracks shipment** via the portal.
7. **Returns handled** if requested → inventory and finance updated.

---

## 🛠️ CRUD Operations

### **1. Orders Management**
- Create: Add new orders from customers.
- Read: View orders and statuses.
- Update: Modify existing orders.
- Delete: Cancel orders.

### **2. Inventory Management**
- Create: Add new inventory batches.
- Read: Check available stock levels.
- Update: Adjust stock after orders or returns.
- Delete: Remove expired or damaged stock.

### **3. Customer Management**
- Create: Add new customers.
- Read: Retrieve customer details by ID.
- Update: Edit customer info.
- Delete: Remove inactive customers.

### **4. Export Cost & Financial Records**
- Create: Record cost entries.
- Read: View cost history.
- Update: Modify costs if needed.
- Delete: Remove incorrect entries.

### **5. Shipment Tracking & Returns**
- Create: Add shipment tracking details.
- Read: View shipment progress.
- Update: Change shipment details if needed.
- Delete: Remove canceled shipments.

---

## 🔐 Login Flow

### **Admin Login**
1. Enter username & password.
2. Access Admin Dashboard with:
   - Orders
   - Inventory
   - Finance
   - Customers
   - Shipments

### **Customer Login**
1. Enter Customer ID & password.
2. Access Customer Dashboard with:
   - My Orders
   - Track Shipment
   - My Profile

---

## 🖥️ Technology Stack
- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js (Express) / PHP
- **Database:** MySQL (via phpMyAdmin)
- **Version Control:** GitHub
- **API Testing:** Postman
- **Development Methodology:** Agile Scrum
- **Integration:** GitHub for code collaboration

---

## 📊 System Integration
The system interacts with:
- **Order Management System:** For receiving and managing orders.
- **Inventory Management System:** For checking and updating stock.
- **Supplier Management System:** For retrieving customer data.
- **Financial Management System:** For cost calculation and invoicing.

---

📌 Future Enhancements

AI-based route optimization for shipments.

Blockchain-based export tracking for transparency.

Multi-language support for international customers.

Mobile application for customers and admins.

📜 License

This project is licensed under the MIT License — you are free to use, modify, and distribute it.
