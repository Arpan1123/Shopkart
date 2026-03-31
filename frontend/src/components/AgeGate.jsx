import { useState } from 'react'

export default function AgeGate() {
  const [verified, setVerified] = useState(() => {
    return sessionStorage.getItem('age_verified') === 'true'
  })

  if (verified) return null

  const handleVerify = () => {
    sessionStorage.setItem('age_verified', 'true')
    setVerified(true)
  }

  const handleDeny = () => {
    window.location.href = 'https://www.google.com'
  }

  return (
    <div className="age-gate-overlay">
      <div className="age-gate-modal">
        <div className="age-gate-icon">🔞</div>
        <h2>Age Verification Required</h2>
        <p>This website contains products intended for adults only. You must be <strong>18 years or older</strong> to access the alcohol section.</p>
        <p className="age-gate-question">Are you 18 years of age or older?</p>
        <div className="age-gate-actions">
          <button className="age-gate-yes" onClick={handleVerify}>
            <i className="fas fa-check"></i> Yes, I am 18+
          </button>
          <button className="age-gate-no" onClick={handleDeny}>
            <i className="fas fa-times"></i> No, I am not
          </button>
        </div>
        <p className="age-gate-disclaimer">By entering, you agree that you are of legal drinking age in your country of residence.</p>
      </div>
    </div>
  )
}
