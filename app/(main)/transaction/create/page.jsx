import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();
  const params = await searchParams;
  const editId = params?.edit;

  // Ensure accounts is an array
  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  let initialData = null;
  if (editId) {
    try {
      const transaction = await getTransaction(editId);
      initialData = transaction;
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-5 pt-5">
      <div className="flex justify-center md:justify-normal mb-2">
        <h1 className="text-5xl gradient-title ">
          {editId ? "Edit" : "Add"} Transaction
        </h1>
      </div>
      <AddTransactionForm
        accounts={safeAccounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
