import React, { useState } from "react";
import { PlusCircle, Trash2, Edit, Phone, Mail, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
}

interface EmergencyContactManagerProps {
  contacts?: Contact[];
  onAddContact?: (contact: Omit<Contact, "id">) => void;
  onUpdateContact?: (contact: Contact) => void;
  onDeleteContact?: (id: string) => void;
}

const EmergencyContactManager: React.FC<EmergencyContactManagerProps> = ({
  contacts = [
    {
      id: "1",
      name: "Jane Doe",
      phone: "(555) 123-4567",
      email: "jane.doe@example.com",
      relationship: "Family",
    },
    {
      id: "2",
      name: "John Smith",
      phone: "(555) 987-6543",
      email: "john.smith@example.com",
      relationship: "Friend",
    },
  ],
  onAddContact = () => {},
  onUpdateContact = () => {},
  onDeleteContact = () => {},
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Omit<Contact, "id">>({
    name: "",
    phone: "",
    email: "",
    relationship: "",
  });

  const handleAddContact = () => {
    onAddContact(newContact);
    setNewContact({
      name: "",
      phone: "",
      email: "",
      relationship: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleUpdateContact = () => {
    if (currentContact) {
      onUpdateContact(currentContact);
      setCurrentContact(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteContact = () => {
    if (currentContact) {
      onDeleteContact(currentContact.id);
      setCurrentContact(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (contact: Contact) => {
    setCurrentContact(contact);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (contact: Contact) => {
    setCurrentContact(contact);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Emergency Contacts
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="name"
                  className="text-right text-sm font-medium"
                >
                  Name
                </label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="phone"
                  className="text-right text-sm font-medium"
                >
                  Phone
                </label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="email"
                  className="text-right text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="relationship"
                  className="text-right text-sm font-medium"
                >
                  Relationship
                </label>
                <Input
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      relationship: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddContact}>Save Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                {contact.name}
              </CardTitle>
              <CardDescription>{contact.relationship}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span>{contact.email}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog(contact)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => openDeleteDialog(contact)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Emergency Contact</DialogTitle>
          </DialogHeader>
          {currentContact && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="edit-name"
                  className="text-right text-sm font-medium"
                >
                  Name
                </label>
                <Input
                  id="edit-name"
                  value={currentContact.name}
                  onChange={(e) =>
                    setCurrentContact({
                      ...currentContact,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="edit-phone"
                  className="text-right text-sm font-medium"
                >
                  Phone
                </label>
                <Input
                  id="edit-phone"
                  value={currentContact.phone}
                  onChange={(e) =>
                    setCurrentContact({
                      ...currentContact,
                      phone: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="edit-email"
                  className="text-right text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentContact.email}
                  onChange={(e) =>
                    setCurrentContact({
                      ...currentContact,
                      email: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="edit-relationship"
                  className="text-right text-sm font-medium"
                >
                  Relationship
                </label>
                <Input
                  id="edit-relationship"
                  value={currentContact.relationship}
                  onChange={(e) =>
                    setCurrentContact({
                      ...currentContact,
                      relationship: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateContact}>Update Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {currentContact?.name} from your
              emergency contacts. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteContact}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmergencyContactManager;
