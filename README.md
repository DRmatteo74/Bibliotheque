# Test technique : Bibliotheque

## Sommaire
1. [Information générale](#information-générale)
2. [Utilisation du site sans installation d'un serveur Web](#utilisation-du-site-sans-installation-dun-serveur-web)
3. [Installation du site sous Apache](#installation-du-site-sous-apache)
4. [Installation du site sous IIS Windows Server](#installation-du-site-sous-iis-windows-server)
5. [Comment fonctionne le site ?](#comment-fonctionne-le-site)

## Information générale : 

Les données sont chargées une seule fois lors de l'ouverture de la page web, puis elles sont stockées dans le session storage. Cette approche permet de modifier les valeurs sans être bloqué si tous les livres ont été emprunté. En effet, lorsque la page web est fermée, le session storage est effacé, et nous repartons avec les données d'origine. Cette méthode facilite la réalisation de tests.

## Utilisation du site sans installation d'un serveur Web
Clonez le dépôt Git : https://github.com/DRmatteo74/Bibliotheque.git puis ouvrez le fichier index.html.


## Installation du site sous Apache
### Prérequis : 
- Ubuntu (ou la distribution linux de votre choix)
- Un accès internet
- Le projet (via git par exemple)

### Installation de Apache :
1. Dans votre terminal, entrez la commande `sudo apt install apache2` pour installer Apache.
2. Pour vérifier que Apache est opérationnel, utilisez la commande `sudo systemctl status apache2`.

### Test du Site Web
1. Entrez la commande `ip a` pour récupérer votre adresse IP.
2. Dans votre navigateur, entrez votre adresse IP.
3. Une page Apache devrait apparaître. Si ce n'est pas le cas, suivez les étapes suivantes :

    3.1. Vérifiez si un pare-feu est actif sur votre système.

    3.2. Si vous avez un pare-feu, ouvrez les ports 80 (http) et 443 (https) pour permettre la communication avec Apache.

### Installation de Git
1. Installez Git en utilisant la commande `sudo apt install git`.
### Clonage du Dépôt Git :
1. Clonez un dépôt Git dans le répertoire d'Apache. Pour cela, déplacez-vous dans le répertoire Apache `cd /var/www/html` et cloner le dépot : `sudo git clone https://github.com/DRmatteo74/Bibliotheque.git`
2. Un dossier nommé Bibliotheque va apparaître. Faite `cd Bibliotheque` puis `mv * /var/www/html` afin de déplacer les fichiers
3. Après avoir déplacé les fichiers, actualisez la page dans votre navigateur. Vous devriez maintenant voir le contenu de votre dépôt Git s'afficher sur la page Apache. Si ce n'est pas le cas, vérifiez que les fichiers sont bien dans le dossier `/var/www/html` et redémarrez Apache : `sudo systemctl restart apache2`

## Installation du site sous IIS Windows Server
### Prérequis : 
- Windows Server
- Un accès internet
- Le projet (via git par exemple)

### Installation de IIS :

1. Ouvrez le "Gestionnaire de serveur" sur votre serveur Windows.
2. Cliquez sur "Gérer" dans le coin supérieur droit, puis sélectionnez "Ajouter des rôles et fonctionnalités".
3. Suivez l'assistant d'installation des rôles et des fonctionnalités, cochez la case "Serveur Web (IIS)" et installez IIS.

### Configuration d'un Site Web dans IIS :

1. Une fois IIS installé, ouvrez le "Gestionnaire des services Internet (IIS)".
2. Dans le volet de gauche, sous "Connexions", cliquez avec le bouton droit de la souris sur "Sites" et sélectionnez "Ajouter un site".
3. Remplissez les détails du site, notamment le nom, le chemin d'accès physique et le numéro de port. Par exemple, configurez-le pour écouter sur le port 80 pour le protocole HTTP.
4. Cliquez sur "OK" pour créer le site.

### Installation de Git :

1. Téléchargez l'installateur Git pour Windows depuis le site officiel de Git (https://git-scm.com/download/win) et exécutez-le pour installer Git sur votre serveur Windows.

### Clonage du Dépôt Git :

1. Ouvrez une invite de commande en tant qu'administrateur.
2. Utilisez la commande `cd` pour naviguer dans le répertoire du site web que vous avez configuré dans l'étape "Configuration d'un Site Web sous IIS". Par exemple : `cd C:\chemin\vers\votresiteweb`.
3. Utilisez la commande git clone pour cloner un dépôt Git : `git clone https://github.com/DRmatteo74/Bibliotheque.git`.
4. Assurez-vous que les fichiers soient bien dans le dossier que vous avez configuré et non dans un sous-dossier. 

### Test du Site Web :

1. Récupérez votre adresse IP : Dans le terminal faite `ipconfig`
2. Ouvrez le navigateur et entrez votre adresse IP. Le site devrait s'afficher.

## Comment fonctionne le site ?

Lorsque vous arrivez sur la page d'accueil, vous avez la possibilité de cliquer sur le bouton "Explorer," situé dans la barre de navigation ou au centre de l'écran, afin d'accéder à la liste des livres. Cette liste de livres peut être triée en fonction de différents critères tels que le nom, l'auteur, la date, le genre, le statut, et bien d'autres. Vous avez également la possibilité de rechercher un livre en utilisant la loupe présente dans la barre de navigation ou en utilisant le champ de texte "Rechercher." Cette fonction de recherche se base sur le titre, l'auteur, la date et le genre.

Une fois que vous avez trouvé le livre qui vous intéresse, il vous suffit de cliquer sur celui-ci pour accéder à des informations plus détaillées. Vous pouvez ensuite réserver ce livre en cliquant sur le bouton "Réserver" et en sélectionnant les dates de début et de fin de votre réservation.