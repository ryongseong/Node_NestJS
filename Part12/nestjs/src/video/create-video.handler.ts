// import { Injectable } from '@nestjs/common';
// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { CreateVideoCommand } from './command/create-video.command';
// import { DataSource } from 'typeorm';
// import { Video } from './entity/video.entity';
// import { User } from 'src/user/entity/user.entity';

// @Injectable()
// @CommandHandler(CreateVideoCommand)
// export class CreateVideoHandler implements ICommandHandler<CreateVideoCommand> {
//   constructor(private dataSource: DataSource) {}

//   async execute(command: CreateVideoCommand): Promise<Video> {
//     const { userId, title, mimetype, extension, buffer } = command;
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.startTransaction();
//     let error;

//     try {
//       const user = await queryRunner.manager.findOneBy(User, { id: userId });
//       const video = await queryRunner.manager.save(queryRunner.manager.save(Video, { title, mimetype, user }));
//       await this.uploadVideo(video.id, extension, buffer);
//       await queryRunner.commitTransaction();
//     } catch (e) {
//       await queryRunner.rollbackTransaction();
//       error = e;
//     } finally {
//       await queryRunner.release();
//       if (error) throw error;
//     }
//   }

//   private async uploadVideo(id: string, extension: string, buffer: Buffer) {
//     console.log('upload video');
//   }
// }
