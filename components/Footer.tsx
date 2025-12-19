export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6">
          <div className="text-2xl font-display font-bold gradient-text mb-2">
            Wiebe Consulting
          </div>
          <p className="text-sm text-slate-400">
            Revenue & Retention Systems for Sports PT Clinics
          </p>
        </div>
        <div className="border-t border-slate-700 pt-6">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Wiebe Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
