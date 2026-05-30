import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { DRIZZLE } from '../../database/drizzle.token';
import { appointments } from '../../database/schema';
import { PetsService } from '../pets/pets.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointments.dto';

type DrizzleDb = any;

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly petsService: PetsService,
  ) {}

  async findAllByPet(petId: string, userId: string) {
    await this.petsService.verifyOwnership(petId, userId);
    return this.db.query.appointments.findMany({
      where: and(eq(appointments.petId, petId), isNull(appointments.deletedAt)),
    });
  }

  async findOne(id: string, userId: string) {
    const appointment = await this.db.query.appointments.findFirst({
      where: and(eq(appointments.id, id), isNull(appointments.deletedAt)),
    });

    if (!appointment) throw new NotFoundException('Agendamento nao encontrado.');
    await this.petsService.verifyOwnership(appointment.petId, userId);

    return appointment;
  }

  async create(userId: string, dto: CreateAppointmentDto) {
    await this.petsService.verifyOwnership(dto.petId, userId);

    const [appointment] = await this.db
      .insert(appointments)
      .values(dto)
      .returning();

    return appointment;
  }

  async update(id: string, userId: string, dto: UpdateAppointmentDto) {
    const existing = await this.findOne(id, userId);

    const [updated] = await this.db
      .update(appointments)
      .set({ ...dto, updatedAt: new Date() })
      .where(and(eq(appointments.id, id), eq(appointments.petId, existing.petId)))
      .returning();

    return updated;
  }

  async remove(id: string, userId: string) {
    const existing = await this.findOne(id, userId);

    await this.db
      .update(appointments)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(appointments.id, id), eq(appointments.petId, existing.petId)));

    return { message: 'Agendamento removido com sucesso.' };
  }
}
