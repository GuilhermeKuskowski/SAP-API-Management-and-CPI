using PurchaseService as service from '../../srv/service';

annotate service.Orders with {

    status @Core.Computed;
    criticality @UI.Hidden;

};

annotate service.Orders with @(

    UI.HeaderInfo : {
        TypeName : 'Pedido',
        TypeNamePlural : 'Pedidos',

        Title : {
            $Type : 'UI.DataField',
            Value : customer
        },

        Description : {
            $Type : 'UI.DataField',
            Value : status
        }
    },

    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Cliente',
            Value : customer
        },
        {
            $Type : 'UI.DataField',
            Label : 'Valor',
            Value : amount
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Label : 'Status',
            Target : '@UI.DataPoint#Status'
        }
    ],

    UI.DataPoint #Status : {
        $Type : 'UI.DataPointType',
        Value : status,
        Criticality : criticality,
        CriticalityRepresentation : #WithIcon,
        Title : 'Status'
    },

    UI.FieldGroup #General : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Cliente',
                Value : customer
            },
            {
                $Type : 'UI.DataField',
                Label : 'Valor',
                Value : amount
            },
            {
                $Type : 'UI.DataFieldForAnnotation',
                Target : '@UI.DataPoint#Status'
            }
        ]
    },

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'General',
            Label : 'Informações Gerais',
            Target : '@UI.FieldGroup#General'
        }
    ]

);