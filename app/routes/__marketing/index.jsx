import { Link } from '@remix-run/react';
import { FaArrowRight, FaDollarSign, FaChartBar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
export default function Index() {
  let { t } = useTranslation();
  return (
    <main>
      <section className="marketing-section">
        <header>
          <FaDollarSign />
          <h2>A Central Space</h2>
        </header>
        <div className="marketing-content">
          <div className="marketing-image">
            <img src="images/expenses-management.jpg" alt="A list of expenses." />
          </div>
          <div className="marketing-explanation">
            <p>{t("index.manage")} </p>
            <p>
              <Link className="cta" to="/expenses">
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="marketing-section">
        <header>
          <FaChartBar />
          <h2>Detailed Analytics</h2>
        </header>
        <div className="marketing-content">
          <p className='marketing-explanation'>
            Benefit from best-in-class analytics to understand your spending
            patterns.
          </p>
          <div className="marketing-image">
            <img src="images/expenses-chart.jpg" alt="A demo bar chart." />
          </div>
        </div>
      </section>
    </main>
  );
}

export function meta() {
  return {
    title: 'RemixExpenses - The Complete App',
    description: 'Manage your expenses with ease.'
  }
}

export function headers({
  actionHeaders,
  loaderHeaders,
  parentHeaders
}) {
  return {
    'Cache-Control': parentHeaders.get('Cache-Control')
  }
}
export const handle = { disabledJS: true };