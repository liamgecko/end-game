"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  AtSign,
  BarChart3,
  ArrowUp,
  Users,
  TrendingDown,
  TrendingUp,
  Clock,
  CreditCard
} from "lucide-react";

const getCurrentDate = () => {
  const now = new Date();
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  const dayName = dayNames[now.getDay()];
  const day = now.getDate();
  const monthName = monthNames[now.getMonth()];
  const quarter = Math.ceil((now.getMonth() + 1) / 3);
  const year = now.getFullYear();
  
  return `${dayName} ${day} ${monthName} · Q${quarter} ${year}`;
};

export default function OverviewPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Date Header */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
          {getCurrentDate()}
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Morning, Travis
        </h1>
      </div>

      {/* Financial Summary */}
      <div className="text-center space-y-4">
        <p className="text-lg text-muted-foreground leading-relaxed">
          This month,{" "}
          <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
            🏛️ University of Gecko
          </span>{" "}
          posted a{" "}
          <span className="font-bold text-foreground">$156.8k profit</span>{" "}
          and grew cash by{" "}
          <span className="inline-flex items-center text-green-600 font-bold">
            <TrendingUp className="h-4 w-4 mr-1" />
            $89k
          </span>
        </p>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          from operational surplus. Expenses rose by{" "}
          <span className="inline-flex items-center text-red-600 font-bold">
            <TrendingUp className="h-4 w-4 mr-1" />
            $2.8k
          </span>
          , burn decreased by{" "}
          <span className="inline-flex items-center text-green-600 font-bold">
            <TrendingDown className="h-4 w-4 mr-1" />
            $742
          </span>
        </p>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          while tuition revenue fell by{" "}
          <span className="inline-flex items-center text-red-600 font-bold">
            <TrendingDown className="h-4 w-4 mr-1" />
            $3.2k
          </span>{" "}
          driven by 2 student withdrawals.
        </p>
      </div>

      {/* Action Card */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground mb-2">
                Build a financial projections report for Q4 ...
              </p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <AtSign className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="p-2">
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Buttons */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
          <Button variant="outline" className="rounded-full px-6 py-2 h-auto">
            <Users className="h-4 w-4 mr-2" />
            Student Enrollment
          </Button>
          <Button variant="outline" className="rounded-full px-6 py-2 h-auto">
            <TrendingDown className="h-4 w-4 mr-2" />
            Financial Analysis
          </Button>
          <Button variant="outline" className="rounded-full px-6 py-2 h-auto">
            <Clock className="h-4 w-4 mr-2" />
            Academic Calendar
          </Button>
          <Button variant="outline" className="rounded-full px-6 py-2 h-auto">
            <CreditCard className="h-4 w-4 mr-2" />
            Budget Planning
          </Button>
        </div>
      </div>
    </div>
  );
} 