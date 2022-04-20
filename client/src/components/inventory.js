import React, { useEffect, useState } from "react";
import { Table, Menu, Button } from "semantic-ui-react";
import {
  TextField,
  Dialog,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import itemsAPI from "../api/items.api";
import warehouseAPI from "../api/warehouse.api";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [warehouseCreateOpen, setWarehouseCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [incoming, setIncoming] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getWarehouses();
    getItems();
  }, []);

  function itemsList() {
    return items.map((item) => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell collapsing>
            <Button
              icon="edit"
              onClick={() => enableEditing(item)}
              style={{ background: "transparent", color: "blue" }}
            />
            <Button
              icon="trash"
              onClick={() => enableRemoval(item)}
              style={{ background: "transparent", color: "red" }}
            />
          </Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.type}</Table.Cell>
          <Table.Cell>{item.manufacturer}</Table.Cell>
          <Table.Cell>{item.warehouse.name}</Table.Cell>
          <Table.Cell>{item.incoming}</Table.Cell>
          <Table.Cell>{item.quantity}</Table.Cell>
        </Table.Row>
      );
    });
  }

  function enableEditing(item) {
    setActiveItem(item);
    setName(item.name);
    setType(item.type);
    setManufacturer(item.manufacturer);
    setWarehouse(warehouses.find((w) => w.id === item.warehouse.id));
    setIncoming(item.incoming);
    setQuantity(item.quantity);
    setEditOpen(true);
  }

  function enableRemoval(item) {
    setActiveItem(item);
    setRemoveOpen(true);
  }

  async function getWarehouses() {
    return warehouseAPI
      .getWarehouses()
      .then((res) => {
        setWarehouses(res.data.data.getWarehouses || []);
      })
      .catch((err) => console.log(err));
  }

  function addWarehouse() {
    const warehouseObj = {
      name: name,
    };

    warehouseAPI
      .createWarehouse(warehouseObj)
      .then((res) => {
        setWarehouses([...warehouses, warehouseObj]);
        setWarehouseCreateOpen(false);
      })
      .catch((err) => console.log(err));
  }

  async function getItems() {
    return itemsAPI
      .getItems()
      .then((res) => {
        setItems(res.data.data.getItems);
      })
      .catch((err) => console.log(err));
  }

  function addItem() {
    const item = {
      name: name,
      type: type,
      manufacturer: manufacturer,
      warehouse: warehouse.id,
      incoming: Number(incoming),
      quantity: Number(quantity),
    };

    itemsAPI
      .createItem(item)
      .then((res) => {
        const newItem = res.data.data.createItem;
        setItems([...items, newItem]);
        setActiveItem(null);
        setCreateOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function removeItem() {
    itemsAPI
      .deleteItem({ id: activeItem.id })
      .then((res) => {
        setItems(items.filter((item) => item.id !== activeItem.id));
        setActiveItem(null);
        setRemoveOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function updateItem() {
    const item = {
      id: activeItem.id,
      name: name,
      type: type,
      manufacturer: manufacturer,
      warehouse: warehouse.id,
      incoming: Number(incoming),
      quantity: Number(quantity),
    };

    itemsAPI
      .updateItem(item)
      .then((res) => {
        const newItem = res.data.data.updateItem;
        setItems([
          ...items.filter((item) => item.id !== activeItem.id),
          newItem,
        ]);
        setActiveItem(null);
        setEditOpen(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Menu secondary>
        <Menu.Item
          name="Shopify Inventory"
          active={true}
          content="Shopify Inventory"
        />
        <Menu.Item
          name="Add Item"
          content="Add Item"
          onClick={() => setCreateOpen(true)}
        />
        <Menu.Item
          name="Add Warehouse"
          content="Add Warehouse"
          onClick={() => setWarehouseCreateOpen(true)}
        />
      </Menu>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Manufacturer</Table.HeaderCell>
            <Table.HeaderCell>Warehouse</Table.HeaderCell>
            <Table.HeaderCell>Incoming</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{itemsList()}</Table.Body>
      </Table>
      <Dialog
        open={removeOpen}
        onClose={() => setRemoveOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item from your inventory?
            There's no going back!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveOpen(false)}>Cancel</Button>
          <Button onClick={() => removeItem()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={warehouseCreateOpen}
        onClose={() => setWarehouseCreateOpen(false)}
      >
        <DialogTitle>Add a new Warehouse!</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            value={name}
            label="Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWarehouseCreateOpen(false)}>Cancel</Button>
          <Button onClick={() => addWarehouse()} autoFocus>
            Add!
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>Create a new Item!</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            value={name}
            label="Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            value={type}
            label="Type"
            fullWidth
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            margin="dense"
            value={manufacturer}
            label="Manufacturer"
            fullWidth
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Warehouse</InputLabel>
            <Select
              value={warehouse}
              title={warehouse.name}
              label="Warehouse"
              onChange={(e) => setWarehouse(e.target.value)}
            >
              {warehouses.map((ware) => (
                <MenuItem key={ware.id} value={ware}>
                  {ware.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            type="Number"
            value={incoming}
            label="Incoming Amount"
            fullWidth
            onChange={(e) => setIncoming(e.target.value)}
          />
          <TextField
            margin="dense"
            type="Number"
            value={quantity}
            label="Quantity"
            fullWidth
            onChange={(e) => setQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button onClick={() => addItem()} autoFocus>
            Add!
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Update Item!</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            value={name}
            label="Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            value={type}
            label="Type"
            fullWidth
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            margin="dense"
            value={manufacturer}
            label="Manufacturer"
            fullWidth
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Warehouse</InputLabel>
            <Select
              value={warehouse}
              title={warehouse.name}
              label="Warehouse"
              onChange={(e) => setWarehouse(e.target.value)}
            >
              {warehouses.map((ware) => (
                <MenuItem key={ware.id} value={ware}>
                  {ware.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            type="number"
            value={incoming}
            label="Incoming Amount"
            fullWidth
            onChange={(e) => setIncoming(e.target.value)}
          />
          <TextField
            margin="dense"
            type="number"
            value={quantity}
            label="Quantity"
            fullWidth
            onChange={(e) => setQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={() => updateItem()} autoFocus>
            Update!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inventory;
