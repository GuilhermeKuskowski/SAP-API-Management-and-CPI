namespace db;

entity Orders {
    key ID        : UUID;
    customer      : String;
    amount        : Decimal(15,2);
    status        : String @Core.Computed;
    criticality   : Integer @Core.Computed;
}