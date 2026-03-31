export default function Account() {
  return (
    <div className="account-container">
      <div className="account-header">
        <h1>My Account</h1>
        <p>Manage your profile, orders, and addresses</p>
      </div>
      <div className="account-wrapper">
        <aside className="account-sidebar">
          <div className="user-profile-summary">
            <img src="https://ui-avatars.com/api/?name=Arpan+Pal&background=2e7d32&color=fff&size=100" alt="User" className="user-avatar" />
            <div className="user-name">Arpan Pal</div>
            <div className="user-email">arpan@freshmart.in</div>
            <span className="account-type">Premium Member</span>
          </div>
          <nav className="account-menu">
            <a href="#" className="menu-item active"><i className="fas fa-user"></i> Personal Info</a>
            <a href="#" className="menu-item"><i className="fas fa-box"></i> My Orders</a>
            <a href="#" className="menu-item"><i className="fas fa-map-marker-alt"></i> Addresses</a>
            <a href="#" className="menu-item"><i className="fas fa-heart"></i> Wishlist</a>
            <a href="#" className="menu-item"><i className="fas fa-cog"></i> Settings</a>
            <a href="#" className="menu-item"><i className="fas fa-sign-out-alt"></i> Logout</a>
          </nav>
        </aside>
        <div className="account-content">
          <h2 className="section-title">Personal Information</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" defaultValue="Arpan" />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" defaultValue="Pal" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" defaultValue="arpan@freshmart.in" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" defaultValue="+91 8910480474" />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn">Save Changes</button>
              <button type="button" className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
