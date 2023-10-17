// /expenses/analysis

import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '~/data/expenses.server';
import { json } from '@remix-run/node';
import { useLoaderData, useRouteError } from '@remix-run/react';
import Error from '~/components/util/Error';
import { requireUserSession } from '~/data/auth.server';

export default function ExpensesAnalysisPage() {
  const expense = useLoaderData();

  return (
    <main>
      <Chart expenses={expense} />
      <ExpenseStatistics expenses={expense} />
    </main>
  );
}

export async function loader({ request }) {

  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json({ message: 'Could not load expenses for the requested analysis' },
      {
        status: 404,
        statusText: 'Expenses not found',
      });
  }
  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useRouteError();
  return <main>
    <Error title={caughtResponse.statusText}>
      <p>{caughtResponse.data?.message || 'Something went wrong - could not load expenses.'}
      </p>
    </Error>
  </main>
}