import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Expense, useExpenseStore } from '@/hooks/useExpenseStore';
import { Trash2, Edit, Calendar, DollarSign } from 'lucide-react';
import { EditExpenseDialog } from './EditExpenseDialog';
import { toast } from 'sonner';

interface ExpenseListProps {
  expenses: Expense[];
  showAll?: boolean;
}

export const ExpenseList = ({ expenses, showAll = true }: ExpenseListProps) => {
  const { deleteExpense } = useExpenseStore();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleDelete = (id: string) => {
    deleteExpense(id);
    toast.success('Expense deleted successfully');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No expenses yet</p>
        <p className="text-sm">Start tracking your expenses to see them here</p>
      </div>
    );
  }

  const displayedExpenses = showAll ? expenses : expenses.slice(0, 5);

  return (
    <div className="space-y-3">
      {displayedExpenses.map((expense) => (
        <Card key={expense.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">
                        {expense.description || expense.category}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {expense.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(expense.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-expense">
                      ${expense.amount.toFixed(2)}
                    </div>
                    {showAll && (
                      <div className="flex gap-1 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingExpense(expense)}
                          className="h-7 w-7 p-0 border-primary/20 hover:border-primary/40"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(expense.id)}
                          className="h-7 w-7 p-0 border-destructive/20 hover:border-destructive/40 hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {!showAll && expenses.length > 5 && (
        <Button variant="outline" className="w-full mt-4">
          View All Expenses ({expenses.length})
        </Button>
      )}

      {editingExpense && (
        <EditExpenseDialog
          expense={editingExpense}
          open={!!editingExpense}
          onOpenChange={(open) => !open && setEditingExpense(null)}
        />
      )}
    </div>
  );
};