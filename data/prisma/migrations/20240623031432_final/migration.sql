-- DropForeignKey
ALTER TABLE "Viagem" DROP CONSTRAINT "Viagem_id_utilizador_fkey";

-- DropForeignKey
ALTER TABLE "foto" DROP CONSTRAINT "foto_id_viagem_fkey";

-- DropForeignKey
ALTER TABLE "local" DROP CONSTRAINT "local_id_viagem_fkey";

-- AddForeignKey
ALTER TABLE "foto" ADD CONSTRAINT "foto_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "Viagem"("id_viagem") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local" ADD CONSTRAINT "local_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "Viagem"("id_viagem") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "Users"("id_utilizador") ON DELETE CASCADE ON UPDATE CASCADE;
