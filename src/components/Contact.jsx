import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
// import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const intent = searchParams.get("intent");
    const prefillKey = intent ? `contact.prefill.${intent}` : null;
    if (prefillKey && t(prefillKey) !== prefillKey) {
      setForm((prev) => ({ ...prev, message: t(prefillKey) }));
    }
  }, [searchParams, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: hidden field that humans never fill in. If it has a value,
    // a bot submitted the form — silently pretend it succeeded.
    if (formRef.current?.elements?.website?.value) {
      toast.success(t("contact.successMessage"));
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      toast.success(t("contact.successMessage")); // Translated success message
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(t("contact.errorMessage")); // Translated error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex min-h-screen items-center justify-center bg-midnight-950 px-4 py-16 pt-24 font-manrope text-silver-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-12 text-center font-playfair text-5xl font-bold text-silver-100 md:text-6xl">
          {t("contact.mainTitle")}
        </h2>
        {/* <p className="text-center text-lg md:text-xl mb-12 max-w-2xl mx-auto text-silver-400 font-manrope">
          {t("contact.description")}
        </p> */}
        <div className="mb-16 text-center text-silver-300"> {/* mb-12 to add space before form */}
          <p className="mb-3 text-xl font-medium">
            {t("footer.tel")}: <a href={`tel:${t("footer.telNo").replace(/[^+\d]/g, '')}`} className="font-manrope font-bold tracking-wide text-bronze-400 transition-colors duration-200 hover:text-bronze-300">{t("footer.telNo")}</a>
          </p>
          <p className="text-xl font-medium">
            {t("footer.fax")}: {t("footer.faxNo")}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xl rounded-xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-bronze-500/30 sm:p-12 lg:p-16">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Honeypot field — hidden from humans, catches spam bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold uppercase tracking-wider text-silver-300">
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.namePlaceholder")}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-5 py-4 text-silver-100 placeholder-slate-500 transition-all duration-300 focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold uppercase tracking-wider text-silver-300">
                  {t("contact.emailLabel")} {/* Updated */}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact.emailPlaceholder")}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-5 py-4 text-silver-100 placeholder-slate-500 transition-all duration-300 focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold uppercase tracking-wider text-silver-300">
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.messagePlaceholder")}
                  rows="5"
                  required
                  className="w-full resize-y rounded-lg border border-slate-700 bg-slate-900/50 px-5 py-4 text-silver-100 placeholder-slate-500 transition-all duration-300 focus:border-bronze-500 focus:outline-none focus:ring-2 focus:ring-bronze-500/50"
                />
              </div>

              <button
                type="submit"
                className="flex w-full transform items-center justify-center rounded-lg bg-[#d4af37] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#b59026] hover:shadow-lg hover:shadow-bronze-500/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="-ml-1 mr-3 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("contact.sending")} {/* Updated */}
                  </>
                ) : (
                  t("contact.sendMessage") // Updated
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" toastClassName="bg-slate-800 text-silver-100 font-manrope" />
    </section>
  );
};

export default Contact;