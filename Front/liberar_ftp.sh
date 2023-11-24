#!/bin/bash

# Atualiza a lista de pacotes
sudo apt update

# Instala o vsftpd
sudo apt install -y vsftpd

# Copia o arquivo de configuração original
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.orig

# Configuração do vsftpd - desabilita o acesso anônimo, permite acesso local, escrita e desabilita o chroot do usuário
echo "anonymous_enable=NO" | sudo tee -a /etc/vsftpd.conf
echo "local_enable=YES" | sudo tee -a /etc/vsftpd.conf
echo "write_enable=YES" | sudo tee -a /etc/vsftpd.conf
echo "chroot_local_user=NO" | sudo tee -a /etc/vsftpd.conf

# Reinicia o serviço vsftpd para aplicar as alterações
sudo systemctl restart vsftpd

# Cria um usuário FTP
read -p "Digite o nome do usuário FTP: " ftp_user
sudo adduser $ftp_user
sudo passwd $ftp_user

# Ajusta as permissões - permitindo ao usuário acessar todas as pastas
sudo chmod 755 /home/$ftp_user

# Abre as portas no firewall
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp

# Reinicia o firewall
sudo ufw reload

echo "Configuração concluída. O usuário FTP '$ftp_user' foi criado e pode acessar todas as pastas."
