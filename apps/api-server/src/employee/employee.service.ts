import { Injectable } from "@nestjs/common";
import { Prisma, Employee } from "@prisma/client";
import { EmployeeRepository } from "./employee.repository";
import { EmployeeRowItem, NewEmployee } from "@api/types/employee";
import { ProducerService } from "@api/queues/producer.service";

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private producerService: ProducerService,
  ) {}

  async createEmployee(params: { data: NewEmployee }): Promise<Employee> {
    try {
      const newEmployee = await this.employeeRepository.createEmployee(params);
      this.producerService.addToEmailQueue({
        from: "xyz@example.com",
        to: "abc@example.com",
        subject: `New Employee Created - ${newEmployee.firstName} ${newEmployee.lastName}`,
        text: JSON.stringify(newEmployee),
      });
      return newEmployee;
    } catch (error) {
      console.error("Error creating employee", error);
      throw error;
    }
  }

  async getEmployeeById(params: { id: string }): Promise<Employee | null> {
    const employee = await this.employeeRepository.getEmployeeById(params);
    if (employee) {
      this.producerService.addToEmailQueue({
        from: "xyz@example.com",
        to: "abc@example.com",
        subject: `New Employee Created - ${employee.firstName} ${employee.lastName}`,
        text: JSON.stringify(employee),
      });
    }
    return employee;
  }

  async getEmployees(): Promise<EmployeeRowItem[]> {
    return this.employeeRepository.getEmployees();
  }

  async updateEmployee(params: {
    id: string;
    data: Prisma.EmployeeUpdateInput;
  }): Promise<Employee> {
    return this.employeeRepository.updateEmployee(params);
  }

  async deleteEmployee(params: { id: string }): Promise<Employee> {
    return this.employeeRepository.deleteEmployee(params);
  }
}
