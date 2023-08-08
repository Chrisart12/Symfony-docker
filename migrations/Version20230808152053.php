<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230808152053 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD selected_project_id INT DEFAULT NULL, ADD last_name VARCHAR(50) DEFAULT NULL, ADD first_name VARCHAR(50) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64921ED5B7F FOREIGN KEY (selected_project_id) REFERENCES project (id)');
        $this->addSql('CREATE INDEX IDX_8D93D64921ED5B7F ON user (selected_project_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64921ED5B7F');
        $this->addSql('DROP INDEX IDX_8D93D64921ED5B7F ON user');
        $this->addSql('ALTER TABLE user DROP selected_project_id, DROP last_name, DROP first_name');
    }
}
