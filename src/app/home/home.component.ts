import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { TarefasService } from '../services/tarefas.service';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {

  public userId :number = this.loginService.getUserId();
  public tarefas:any    = [];

  constructor( 
      private service: TarefasService
    , private loginService: LoginService
    , private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.getTarefas();
  }
  
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      right: 'title,prev,next',
      center: '',
      left: 'timeGridDay,timeGridWeek,dayGridMonth'
    },
    locale: 'pt-br',
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Hoje',
      list: 'Lista'
    },
    eventColor: '#F4C584',
    initialView: 'dayGridMonth',
    height: '500',
    plugins: [dayGridPlugin, interactionPlugin],
    // dateClick: (arg) => this.handleDateClick(arg),
    events: [ ]
  };

  tasksLoaded = false;

  getTarefas() {
    this.service.getTarefas(this.userId).subscribe((res:any) => {
      if(res.blOk) {
        this.tarefas = Object.assign([], res.data.map((tarefa: { TITULO: any; DTENTREGA: string | number | Date; }) => ({
          title: tarefa.TITULO,
          date: this.formatDate2(tarefa.DTENTREGA),
        })));

        this.calendarOptions = {
          locale: 'pt-br',
          buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Hoje',
            list: 'Lista'
          },
          initialView: 'dayGridMonth',
          plugins: [dayGridPlugin, interactionPlugin],
          // dateClick: (arg) => this.handleDateClick(arg),
          events: this.tarefas
        };
        this.tasksLoaded = true;
        console.log(this.tarefas);
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    });
  }

  // handleDateClick(arg: DateClickArg) {
  //   this.toastr.success('Clicou');
  // }

  formatDate2(dateString: any): any {
    if (!dateString) {
        return ''; 
    }
    dateString = dateString.slice(0, 10);
    const dateParts           = dateString.split('-');
    const formattedDateParts  = [dateParts[0], dateParts[1], dateParts[2] ];
    const formattedDateString = formattedDateParts.join('-');
    return formattedDateString;
  }
}
