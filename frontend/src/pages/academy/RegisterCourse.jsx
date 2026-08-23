import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  FileCheck2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import courses from "../../data/courses";
import Container from "../../components/common/Container";
import {
  startCourseRegistration,
  verifyCourseRegistrationPayment,
} from "../../api/courseRegistrationApi";
import "../../styles/register-course.css";

function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Razorpay Checkout could not be loaded."));
    document.body.appendChild(script);
  });
}

export default function RegisterCourse() {
  const [searchParams] = useSearchParams();
  const initialSlug = searchParams.get("course") || courses[0]?.slug || "";

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    referral_id: "",
    course_slug: initialSlug,
  });
  const [payment, setPayment] = useState(null);
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.slug === form.course_slug) || courses[0],
    [form.course_slug]
  );

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const startPayment = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSuccess(null);

    if (!form.full_name || !form.email || !form.phone || !form.course_slug) {
      setError("Please complete your name, email, phone number and course selection.");
      return;
    }

    try {
      setLoading(true);
      const order = await startCourseRegistration(form);
      setPayment(order);
      await loadRazorpay();

      const razorpay = new window.Razorpay({
        key: order.razorpay_key_id,
        amount: order.amount * 100,
        currency: order.currency,
        name: "QodeKraft",
        description: order.course_title,
        order_id: order.razorpay_order_id,
        image: "/logo/qodekraft-logo-premium.png",
        prefill: {
          name: form.full_name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          course: order.course_title,
          registration_id: order.registration_id,
        },
        theme: { color: "#25bfff" },
        handler: (response) => {
          setPayment((current) => ({
            ...current,
            ...response,
            paid: true,
          }));
          setMessage("Payment completed. Enter your UTR / transaction reference to complete verification.");
          setLoading(false);
        },
        modal: { ondismiss: () => setLoading(false) },
      });

      razorpay.on("payment.failed", (response) => {
        setError(response?.error?.description || "Payment failed. Please try again.");
        setLoading(false);
      });

      razorpay.open();
    } catch (err) {
      setError(err.message || "Unable to start payment.");
      setLoading(false);
    }
  };

  const verifyPayment = async (event) => {
    event.preventDefault();
    if (!payment?.razorpay_payment_id || !utr.trim()) {
      setError("Enter the UTR / transaction reference received after payment.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const result = await verifyCourseRegistrationPayment({
        registration_id: payment.registration_id,
        razorpay_payment_id: payment.razorpay_payment_id,
        razorpay_order_id: payment.razorpay_order_id,
        razorpay_signature: payment.razorpay_signature,
        utr: utr.trim(),
      });
      setSuccess(result);
      setMessage("");
    } catch (err) {
      setError(err.message || "Payment verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-course-page">
      <div className="register-course-bg" aria-hidden="true" />
      <div className="register-course-orbit register-orbit-one" aria-hidden="true" />
      <div className="register-course-orbit register-orbit-two" aria-hidden="true" />

      <Container>
        <section className="register-course-hero">
          <div className="register-hero-copy">
            <div className="register-kicker">
              <span className="register-kicker-dot" /> QODEKRAFT ACADEMY
            </div>
            <h1>
              Secure your seat.
              <span> Start learning.</span>
            </h1>
            <p>
              Complete your course registration through a secure Razorpay checkout.
              Select your learning path below and continue to secure payment.
            </p>
            <div className="register-hero-points">
              <span><Check size={15} /> Verified payment</span>
              <span><Check size={15} /> Unique registration ID</span>
              <span><Check size={15} /> Email confirmation</span>
            </div>
          </div>

          <div className="register-brand-card">
            <div className="brand-card-glow" />
            <img src="/logo/qodekraft-logo-premium.png" alt="QodeKraft" />
            <div className="brand-card-divider" />
            <div className="brand-card-status"><span /> Registration portal online</div>
            <div className="brand-card-program">
              <small>QODEKRAFT ACADEMY</small>
              <strong>Choose your learning path</strong>
              <span>Secure registration • Mentor-led programs</span>
            </div>
          </div>
        </section>

        <section className="register-steps" aria-label="Registration steps">
          <div className="register-step active"><span>01</span><div><strong>Details</strong><small>Tell us about you</small></div></div>
          <div className="register-step-line" />
          <div className={`register-step ${payment?.paid ? "active" : ""}`}><span>02</span><div><strong>Payment</strong><small>Secure Razorpay checkout</small></div></div>
          <div className="register-step-line" />
          <div className={`register-step ${success ? "active" : ""}`}><span>03</span><div><strong>Confirmation</strong><small>Verified registration</small></div></div>
        </section>

        <section className="registration-layout">
          <form className="registration-card" onSubmit={startPayment}>
            <div className="registration-card-top">
              <div>
                <span className="summary-label">REGISTRATION DETAILS</span>
                <h2>Join the next learning cohort</h2>
                <p>Use the same details you want on your QodeKraft registration record.</p>
              </div>
              <div className="secure-pill"><LockKeyhole size={14} /> Secure</div>
            </div>

            <div className="registration-fields">
              <label>
                <span>Full Name <b>*</b></span>
                <input name="full_name" value={form.full_name} onChange={update} placeholder="Enter your full name" autoComplete="name" />
              </label>
              <label>
                <span>Email Address <b>*</b></span>
                <input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" />
              </label>
              <label>
                <span>Phone Number <b>*</b></span>
                <input name="phone" value={form.phone} onChange={update} placeholder="+91 98765 43210" autoComplete="tel" />
              </label>
              <label>
                <span>Referral ID <em>Optional</em></span>
                <input name="referral_id" value={form.referral_id} onChange={update} placeholder="Enter referral ID" />
              </label>
              <label className="full-field course-select-field">
                <span>Select Your Course <b>*</b></span>
                <div className="select-wrap">
                  <select name="course_slug" value={form.course_slug} onChange={update}>
                    {courses.map((course) => (
                      <option key={course.slug} value={course.slug}>{course.title}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} />
                </div>
              </label>
            </div>

            <button className="register-pay-button" type="submit" disabled={loading || Boolean(payment?.paid)}>
              <CreditCard size={19} />
              {loading ? "Opening secure payment…" : payment?.paid ? "Payment completed" : "Continue to secure payment"}
              {!loading && !payment?.paid && <ArrowRight size={17} />}
            </button>

            <div className="payment-note"><ShieldCheck size={16} /> You will be redirected to Razorpay's secure checkout.</div>
            {message && <div className="register-message">{message}</div>}
            {error && <div className="register-error">{error}</div>}
          </form>

          <aside className="registration-summary">
            <div className="summary-topline"><span className="summary-label">YOUR SELECTED PROGRAM</span><span className="summary-badge">Selected</span></div>
            <div className="summary-image"><img src={selectedCourse.image} alt={`${selectedCourse.title} course`} /></div>
            <div className="summary-category">{selectedCourse.category}</div>
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <div className="summary-row"><span>Level</span><strong>{selectedCourse.level}</strong></div>
            <div className="summary-secure"><ShieldCheck size={18} /><div><strong>Verified checkout</strong><span>Payment is validated by the QodeKraft server.</span></div></div>
          </aside>
        </section>

        {payment?.paid && !success && (
          <section className="utr-card">
            <div className="utr-icon"><CheckCircle2 size={25} /></div>
            <div className="utr-copy">
              <span className="summary-label">02 · PAYMENT RECEIVED</span>
              <h2>One last verification</h2>
              <p>Enter the UTR / UPI transaction reference from your payment app. The server checks the Razorpay payment, amount and duplicate transaction reference before confirming your seat.</p>
            </div>
            <form onSubmit={verifyPayment} className="utr-form">
              <input value={utr} onChange={(event) => setUtr(event.target.value)} placeholder="Enter UTR / transaction reference" autoComplete="off" />
              <button className="register-pay-button" type="submit" disabled={loading}>{loading ? "Verifying…" : "Verify & Complete Registration"}</button>
            </form>
          </section>
        )}

        {success && (
          <section className="registration-success">
            <div className="success-top">
              <div className="success-check"><CheckCircle2 size={40} /></div>
              <div><span className="summary-label">03 · VERIFIED</span><h2>You're officially registered.</h2><p>Your payment has been verified and your QodeKraft Academy registration is complete.</p></div>
            </div>
            <div className="success-grid">
              <div><span>Registration ID</span><strong>{success.registration_id}</strong></div>
              <div><span>Course</span><strong>{success.course_title}</strong></div>
              <div><span>Payment</span><strong className="paid-text">✓ Paid & verified</strong></div>
            </div>
            <div className="success-email"><Mail size={19} /> {success.email_sent ? <>Confirmation sent to <strong>{form.email}</strong>.</> : <>Registration confirmed. SMTP is not currently configured for email delivery to <strong>{form.email}</strong>.</>}</div>
          </section>
        )}

        <section className="registration-trust-copy">
          <div className="trust-icon"><FileCheck2 size={22} /></div>
          <div>
            <h3>Registration you can trust.</h3>
            <p>QodeKraft confirms a registration only after the backend validates the Razorpay order, payment signature, captured payment and transaction reference. A unique registration ID is then issued for your records.</p>
          </div>
        </section>
      </Container>
    </main>
  );
}
