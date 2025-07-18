import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration} from 'chart.js';
import { ManagerSidebarComponent } from "../manager-sidebar/manager-sidebar.component";
import { AuthService } from '../../app/auths/auth.service';



@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, ManagerSidebarComponent],
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  

  username = '';
  role = '';

  teamSize = 48;
  pendingApprovals = 5;
  activeProjects = 7;
  escalations = 2;

  taskDistributionData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Completed', 'In Progress', 'Pending', 'Blocked'],
    datasets: [{
      data: [60, 25, 10, 5],
      backgroundColor: ['#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b']
    }]
  };

  taskDistributionOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  projectStatusData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Alpha', 'Beta', 'Gamma', 'Delta'],
    datasets: [{
      label: 'Progress (%)',
      data: [80, 65, 90, 55],
      backgroundColor: '#4e73df'
    }]
  };

  projectStatusOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  announcements = [
    { title: 'New Project Kickoff: Zeta', date: new Date('2024-07-01'), type: 'announcement' },
    { title: 'Monthly Review Meeting', date: new Date('2024-07-05'), type: 'meeting' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.username = user.username;
      this.role = user.role;
    }
  }

  getEventIcon(type: string): string {
    switch (type) {
      case 'meeting': return 'fa-calendar-check';
      case 'announcement': return 'fa-bullhorn';
      default: return 'fa-calendar';
    }
  }
}
