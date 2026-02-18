export interface IBudgetItem {
    amount: number;
    description: string;
    category: string;
}


export interface IBudgetData {
    incomes: IBudgetItem[];
    expenses: IBudgetItem[];
}