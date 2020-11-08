import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(data => data.type === 'income')
      .reduce((total, i) => total + i.value, 0);
    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((total, { value }) => total + value, 0);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
