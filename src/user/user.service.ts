import { Body, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { jwtConstants } from 'src/auth/auth.constants';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  prisma = new PrismaClient();

  //   async createUser(token, values) {
  //     try {
  //       await this.jwtService.verifyAsync(token, {
  //         secret: jwtConstants.secret,
  //       });

  //       const {
  //         nguoi_dung_id,
  //         ten_nguoi_dung,
  //         email,
  //         pass_word,
  //         phone,
  //         birth_day,
  //         gender,
  //         role,
  //         skill,
  //         certification,
  //       } = values;

  //       const checkUser = await this.prisma.nguoiDung.findFirst({
  //         where: { email },
  //       });

  //       if (!checkUser) {
  //         const updateUser = {
  //           nguoi_dung_id,
  //           ten_nguoi_dung,
  //           email,
  //           pass_word,
  //           phone,
  //           birth_day,
  //           gender,
  //           role,
  //           skill,
  //           certification,
  //         };

  //         await this.prisma.nguoiDung.create({ data: updateUser });

  //         return { ...updateUser, message: 'Tạo người dùng thành công' };
  //       } else {
  //         throw new HttpException(
  //           { content: 'email đã tồn tại', code: 404 },
  //           404,
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       throw new HttpException(error.response.content, error.status);
  //     }
  //   }

  async getUser(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.users.findMany();
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }

  async getAddressByUserId(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const data = await this.prisma.user_addresses.findMany({
        where: { user_id: id },
      });
      return data;
    } catch (error) {
      return 'Error authentication';
    }
  }

  async getPaymentMethodsByUserId(token, payload) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const { user_id, token_last4, brand, exp_month, exp_year } = payload;
      const createAt = new Date();

      const checkUser = await this.prisma.users.findFirst({
        where: { id: Number(user_id) },
      });

      if (!checkUser) {
        return 'User not found, please check the user ID again';
      }

      const payloadPayment = {
        user_id: Number(user_id),
        psp: 'stripe',
        token_last4: String(token_last4),
        brand: String(brand),
        exp_month: Number(exp_month),
        exp_year: Number(exp_year),
        created_at: createAt,
      };

      const data = await this.prisma.payment_methods.create({
        data: {
          ...payloadPayment,
        },
      });
      return { ...data, message: 'Payment successful' };
    } catch (error) {
      return 'Error authentication';
    }
  }

  //   async removeUser(token, id: number) {
  //     try {
  //       await this.jwtService.verifyAsync(token, {
  //         secret: jwtConstants.secret,
  //       });
  //       const user = await this.prisma.nguoiDung.findFirst({
  //         where: { nguoi_dung_id: id },
  //       })

  //   async removeUser(token, id: number) {
  //     try {
  //       await this.jwtService.verifyAsync(token, {
  //         secret: jwtConstants.secret,
  //       });
  //       const user = await this.prisma.nguoiDung.findFirst({
  //         where: { nguoi_dung_id: id },
  //       });
  //       if (user) {
  //         await this.prisma.nguoiDung.delete({ where: { nguoi_dung_id: id } });
  //         return 'Xóa người dùng thành công';
  //       } else {
  //         return 'Xóa người dùng thất bại, kiểm tra lại ID của người dùng';
  //       }
  //     } catch (error) {
  //       return 'Lỗi xác thực';
  //     }
  //   }

  // async userInfo(token, id: number) {
  //   try {
  //     await this.jwtService.verifyAsync(token, {
  //       secret: jwtConstants.secret,
  //     });
  //     const userInfo = await this.prisma.nguoiDung.findFirst({
  //       where: { nguoi_dung_id: id },
  //     });
  //     return userInfo;
  //   } catch (error) {
  //     return 'Lỗi xác thực';
  //   }
  // }

  // async userUserPage(token, paginationOptions, keyword) {
  //   try {
  //     await this.jwtService.verifyAsync(token, {
  //       secret: jwtConstants.secret,
  //     });
  //     const { pageIndex, pageSize } = paginationOptions;
  //     const skip = (pageIndex - 1) * pageSize;

  //     const user = await this.prisma.nguoiDung.findMany({
  //       where: { role: keyword },
  //       take: Number(pageSize),
  //       skip: skip,
  //     });
  //     return user;
  //   } catch (error) {
  //     return 'Lỗi xác thực';
  //   }
  // }

  // async updateUser(token, id: number, userUpdate) {
  //   try {
  //     await this.jwtService.verifyAsync(token, {
  //       secret: jwtConstants.secret,
  //     });

  //     const {
  //       nguoi_dung_id,
  //       ten_nguoi_dung,
  //       email,
  //       pass_word,
  //       phone,
  //       birth_day,
  //       gender,
  //       role,
  //       skill,
  //       certification,
  //     } = userUpdate;

  //     const checkUser = await this.prisma.nguoiDung.findFirst({
  //       where: { email },
  //     });

  //     if (!checkUser) {
  //       const updateUser = {
  //         nguoi_dung_id,
  //         ten_nguoi_dung,
  //         email,
  //         pass_word,
  //         phone,
  //         birth_day,
  //         gender,
  //         role,
  //         skill,
  //         certification,
  //       };

  //       await this.prisma.nguoiDung.update({
  //         data: updateUser,
  //         where: { nguoi_dung_id: id },
  //       });

  //       return { ...updateUser };
  //     } else {
  //       throw new HttpException(
  //         { content: 'email đã tồn tại', code: 404 },
  //         404,
  //       );
  //     }
  //   } catch (error) {
  //     throw new HttpException(error.response.content, error.status);
  //   }
  // }

  // async searchUserName(token, TenNguoiDung: string) {
  //   try {
  //     await this.jwtService.verifyAsync(token, {
  //       secret: jwtConstants.secret,
  //     });
  //     const data = await this.prisma.nguoiDung.findFirst({
  //       where: { ten_nguoi_dung: TenNguoiDung },
  //     });
  //     if (data) {
  //       return data;
  //     } else {
  //       throw new HttpException(
  //         { content: `Không có người dùng tên ${TenNguoiDung}`, code: 404 },
  //         404,
  //       );
  //     }
  //   } catch (error) {
  //     throw new HttpException(error.response.content, error.status);
  //   }
  // }

  // async uploadAvatar(token, file: Express.Multer.File, id: number) {
  //   try {
  //     await this.jwtService.verifyAsync(token, {
  //       secret: jwtConstants.secret,
  //     });
  //     const { destination, filename } = file;
  //     const link = `https://fiverr.memorytera.com/public/img/${filename}`;

  //     const getUserById = await this.prisma.nguoiDung.findFirst({
  //       where: { nguoi_dung_id: id },
  //     });

  //     if (getUserById) {
  //       getUserById.hinh_dai_dien = link;

  //       await this.prisma.nguoiDung.update({
  //         data: getUserById,
  //         where: {
  //           nguoi_dung_id: Number(id),
  //         },
  //       });
  //       return 'Cập nhật ảnh đại diện thành công';
  //     }
  //     throw new HttpException(
  //       { content: 'Cập nhật ảnh đại diện không thành công', code: 404 },
  //       404,
  //     );
  //   } catch (error) {
  //     throw new HttpException(error.response.content, error.status);
  //   }
  // }
}
