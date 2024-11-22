import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    //mejoro los logs en la aplicacion
    private readonly logger = new Logger('Prisma service');

    onModuleInit() {
        this.$connect();
        this.logger.log('Connected to database');
    }
}
