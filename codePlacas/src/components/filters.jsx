import React from "react";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Autocomplete,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { brown } from "@mui/material/colors";
import { FilterAlt, ExpandLess, ExpandMore } from "@mui/icons-material";

function Box({ children }) {
  return <div className={`flex flex-col w-full`}>{children}</div>;
}

export default function Filters() {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    placas: "",
    estado: null,
    tipoPlacas: null,
    fecha_inicio: "",
    fecha_fin: "",
    stolen: false,
    ticket: false,
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAutocompleteChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormValues({
      placas: "",
      estado: null,
      tipoPlacas: null,
      fecha_inicio: "",
      fecha_fin: "",
      stolen: false,
      ticket: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filtros:", formValues);
  };

  // Falsos datos de ejemplo
  const estados = [
    { label: "Oaxaca", _id: 1 },
    { label: "Puebla", _id: 2 },
  ];

  const tiposPlacas = [
    { label: "Particular", _id: 1 },
    { label: "Gubernamental", _id: 2 },
    { label: "Comercial", _id: 3 },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <List component="nav">
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <FilterAlt />
          </ListItemIcon>
          <ListItemText primary="Filtros" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="flex flex-wrap gap-4 p-4">
            <Box w="md">
              <TextField
                label="Placa"
                name="placas"
                value={formValues.placas}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box w="md">
              <Autocomplete
                options={estados}
                getOptionLabel={(option) => option.label}
                value={formValues.estado}
                onChange={(_, value) =>
                  handleAutocompleteChange("estado", value)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Estado" />
                )}
              />
            </Box>
            <Box w="md">
              <Autocomplete
                options={tiposPlacas}
                getOptionLabel={(option) => option.label}
                value={formValues.tipoPlacas}
                onChange={(_, value) =>
                  handleAutocompleteChange("tipoPlacas", value)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Tipo de Placa" />
                )}
              />
            </Box>
            <Box w="md">
              <TextField
                label="Fecha Inicio"
                type="date"
                name="fecha_inicio"
                value={formValues.fecha_inicio}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
            <Box w="md">
              <TextField
                label="Fecha Fin"
                type="date"
                name="fecha_fin"
                variant="outlined"
                value={formValues.fecha_fin}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>

            <Box w="md">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.stolen}
                      onChange={handleSwitchChange}
                      name="stolen"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: brown[500],
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: brown[500],
                          },
                      }}
                    />
                  }
                  label="Robado"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.ticket}
                      onChange={handleSwitchChange}
                      name="ticket"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: brown[500],
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: brown[500],
                          },
                      }}
                    />
                  }
                  label="Con multa"
                />
              </FormGroup>
            </Box>

            <div className="flex flex-row space-x-4">
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: brown[500], color: "white" }}
              >
                Buscar
              </Button>
              <Button
                onClick={handleReset}
                variant="outlined"
                sx={{ borderColor: brown[500], color: brown[500] }}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </Collapse>
      </List>
    </form>
  );
}
