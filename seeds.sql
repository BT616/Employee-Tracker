INSERT INTO department(name)
VALUES ("ENGINEERING"),("FINANCE"),("SALES"),("LEGAL" );

INSERT INTO role(title,salary,department_id)
VALUES 
            ("Lead Engineer",150000,1),
        ("Software Engineer",120000,1),
        ("Account Manager",160000, 2),
        ("Accountant",125000,2),
        ( "Sales lead",100000,3),
        ("Sales Person",80000,3),
        ("Legal Team Lead",250000,4),
        ( "Lawyer",190000, 4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES 
        ("john","doe",1,null),
        ("mike","chan",2,1),
        ("ashley","rodriguez",3,null),
        ("kevin","tupik",4,3),
        ("kunal","singh",5,null),
        ("malia","brown",6,5),
        ("sarah","lpourd",7,null),
        ("tom","allen",8,7);
