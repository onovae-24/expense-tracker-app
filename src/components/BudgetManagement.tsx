import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useExpenseStore } from '@/hooks/useExpenseStore';
import { toast } from 'sonner';
import { DollarSign, Target, TrendingUp } from 'lucide-react';

interface BudgetManagementProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BudgetManagement = ({ open, onOpenChange }: BudgetManagementProps) => {
  const { budget, setBudget, thisMonthTotal, budgetProgress } = useExpenseStore();
  const [newBudget, setNewBudget] = useState(budget.toString());

  useEffect(() => {
    setNewBudget(budget.toString());
  }, [budget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('BudgetManagement - Form submitted:', { newBudget });
    
    const budgetAmount = parseFloat(newBudget);
    if (isNaN(budgetAmount) || budgetAmount <= 0) {
      console.log('BudgetManagement - Validation failed: invalid amount');
      toast.error('Please enter a valid budget amount');
      return;
    }

    console.log('BudgetManagement - About to set budget:', budgetAmount);
    setBudget(budgetAmount);
    console.log('BudgetManagement - Budget set successfully');
    toast.success('Budget updated successfully!');
    onOpenChange(false);
  };

  const remainingBudget = budget - thisMonthTotal;
  const isOverBudget = remainingBudget < 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Budget Management</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Monthly Budget
                </CardTitle>
                <Target className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">${budget.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Spent This Month
                </CardTitle>
                <DollarSign className="h-4 w-4 text-expense" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-expense">${thisMonthTotal.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {isOverBudget ? 'Over Budget' : 'Remaining'}
                </CardTitle>
                <TrendingUp className={`h-4 w-4 ${isOverBudget ? 'text-expense' : 'text-success'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${isOverBudget ? 'text-expense' : 'text-success'}`}>
                  ${Math.abs(remainingBudget).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Progress */}
          <Card className="bg-gradient-card border-0">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Progress</span>
                  <span className={budgetProgress > 100 ? 'text-expense font-medium' : 'text-muted-foreground'}>
                    {budgetProgress.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={Math.min(budgetProgress, 100)} 
                  className="h-3"
                />
                {budgetProgress > 100 && (
                  <p className="text-sm text-expense font-medium">
                    You've exceeded your budget by ${(thisMonthTotal - budget).toFixed(2)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Update Budget Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                placeholder="Enter monthly budget"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Update Budget
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};