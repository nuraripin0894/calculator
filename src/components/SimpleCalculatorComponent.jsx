import React from "react";
import {
  CALC_BUTTON_LIST,
  CALC_OPERATOR_LIST,
} from "./constants/calculator.constants";
import Button from "@mui/material/Button";

class SimpleCalculatorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: "",
      equalsPressed: false,
    };
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.contentContainer}>
          <h1 style={styles.title}>Simple Calculator</h1>
          <div style={styles.calculator}>
            <div style={styles.display}>
              <input
                style={styles.input}
                type="text"
                placeholder="0"
                value={this.state.valueInput}
                readOnly
                onChange={(event) => {
                  this.setState({
                    valueInput: event.target.value,
                  });
                }}
              />
            </div>
            <div style={styles.buttonList}>
              {CALC_BUTTON_LIST.map((key) => (
                <Button
                  variant="contained"
                  key={key}
                  style={styles.button(key)}
                  onClick={() => {
                    const { length: valueInputLength } = this.state.valueInput;

                    const isLastvalueInputCharOperator =
                      CALC_OPERATOR_LIST.includes(
                        this.state.valueInput.charAt(valueInputLength - 1)
                      );
                    const isKeyOperator = CALC_OPERATOR_LIST.includes(key);

                    switch (key) {
                      case "AC":
                        this.setState({
                          valueInput: "",
                        });
                        break;
                      case "DEL":
                        this.setState({
                          valueInput: String(
                            this.state.valueInput.substring(
                              0,
                              this.state.valueInput.length - 1
                            )
                          ),
                        });
                        break;
                      case "=": {
                        const expression = this.state.valueInput
                          .replace(/π/g, "3.14159")
                          .replace(/\^/g, "**");
                        try {
                          if (this.state.valueInput !== "Error") {
                            const result = eval(expression);
                            this.setState({
                              valueInput: String(result),
                              equalsPressed: true,
                            });
                          }
                        } catch {
                          this.setState({
                            valueInput: "Error",
                            equalsPressed: false,
                          });
                        }
                        break;
                      }
                      case ")": {
                        const openCount = (
                          this.state.valueInput.match(/\(/g) || []
                        ).length;
                        const closeCount = (
                          this.state.valueInput.match(/\)/g) || []
                        ).length;
                        if (openCount > closeCount) {
                          this.setState({
                            valueInput: String(this.state.valueInput) + key,
                          });
                        } else {
                          break;
                        }
                        break;
                      }

                      default: {
                        if (
                          this.state.equalsPressed === true &&
                          !isKeyOperator &&
                          key !== "."
                        ) {
                          {
                            this.setState({
                              valueInput: String(key),
                              equalsPressed: false,
                            });
                          }
                          break;
                        }

                        if (isKeyOperator) {
                          if (this.state.equalsPressed === true) {
                            this.setState({
                              equalsPressed: false,
                            });
                          }
                          if (
                            valueInputLength == 0 &&
                            key !== "(" &&
                            key !== "-" &&
                            key !== "π"
                          ) {
                            {
                              this.setState({
                                valueInput:
                                  String(this.state.valueInput) + "0" + key,
                              });
                            }
                            break;
                          }

                          if (isLastvalueInputCharOperator) {
                            if (key === "π") {
                              if (
                                this.state.valueInput[valueInputLength - 1] ===
                                "^"
                              ) {
                                this.setState({
                                  valueInput: String(
                                    this.state.valueInput.substring(
                                      0,
                                      valueInputLength - 1
                                    ) +
                                      "*" +
                                      key
                                  ),
                                });
                                break;
                              } else if (
                                this.state.valueInput[valueInputLength - 1] ===
                                ")"
                              ) {
                                this.setState({
                                  valueInput:
                                    String(this.state.valueInput) + "*" + key,
                                });
                                break;
                              }
                            }
                            if (
                              this.state.valueInput[valueInputLength - 1] ==
                                "π" &&
                              key !== "^"
                            ) {
                              if (key === "(") {
                                this.setState({
                                  valueInput:
                                    String(this.state.valueInput) + "*" + key,
                                });
                              } else {
                                this.setState({
                                  valueInput:
                                    String(this.state.valueInput) + key,
                                });
                              }
                              break;
                            }
                            if (key === "(") {
                              if (
                                this.state.valueInput[valueInputLength - 1] ===
                                ")"
                              ) {
                                this.setState({
                                  valueInput:
                                    String(this.state.valueInput) + "*" + key,
                                });
                                break;
                              }
                            }

                            if (key === "-") {
                              if (
                                this.state.valueInput[valueInputLength - 1] !==
                                  "-" &&
                                this.state.valueInput[valueInputLength - 1] !==
                                  "+" &&
                                this.state.valueInput[valueInputLength - 1] !==
                                  "^"
                              ) {
                                this.setState({
                                  valueInput:
                                    String(this.state.valueInput) + key,
                                });
                              } else {
                                this.setState({
                                  valueInput: String(
                                    this.state.valueInput.substring(
                                      0,
                                      valueInputLength - 1
                                    ) + key
                                  ),
                                });
                              }
                              break;
                            } else {
                              if (valueInputLength === 1) {
                                if (key !== "(") {
                                  break;
                                } else {
                                  this.setState({
                                    valueInput:
                                      String(this.state.valueInput) + key,
                                  });
                                }
                              } else if (
                                !CALC_OPERATOR_LIST.includes(
                                  this.state.valueInput.charAt(
                                    valueInputLength - 2
                                  )
                                )
                              ) {
                                if (key === "(") {
                                  this.setState({
                                    valueInput:
                                      String(this.state.valueInput) + key,
                                  });
                                } else {
                                  if (key !== "π") {
                                    this.setState({
                                      valueInput: String(
                                        this.state.valueInput.substring(
                                          0,
                                          valueInputLength - 1
                                        ) + key
                                      ),
                                    });
                                  } else {
                                    this.setState({
                                      valueInput:
                                        String(this.state.valueInput) + key,
                                    });
                                  }
                                }
                                break;
                              } else {
                                if (
                                  key === "π" &&
                                  this.state.valueInput[valueInputLength - 1] ==
                                    "("
                                ) {
                                  this.setState({
                                    valueInput:
                                      String(this.state.valueInput) + key,
                                  });
                                  break;
                                }
                              }
                              break;
                            }
                          } else if (
                            valueInputLength == 0 ||
                            this.state.valueInput === "Error"
                          ) {
                            if (key === "(" || key === "-" || key === "π") {
                              this.setState({
                                valueInput: String(key),
                              });
                            } else {
                              break;
                            }
                          } else {
                            if (
                              (key === "(" || key === "π") &&
                              valueInputLength !== 0
                            ) {
                              this.setState({
                                valueInput:
                                  String(this.state.valueInput) + "*" + key,
                              });
                              break;
                            }
                            this.setState({
                              valueInput: String(this.state.valueInput) + key,
                            });
                          }
                          break;
                        } else {
                          if (this.state.equalsPressed === true) {
                            this.setState({
                              equalsPressed: false,
                            });
                          }
                          if (key == "0") {
                            if (
                              valueInputLength === 0 ||
                              isLastvalueInputCharOperator
                            ) {
                              break;
                            }
                          }
                          if (
                            this.state.valueInput[valueInputLength - 1] === "π"
                          ) {
                            this.setState({
                              valueInput:
                                String(this.state.valueInput) + "*" + key,
                            });
                          } else if (this.state.valueInput === "Error") {
                            this.setState({
                              valueInput: String(key),
                            });
                          } else {
                            this.setState({
                              valueInput: String(this.state.valueInput) + key,
                            });
                          }
                          break;
                        }
                      }
                    }
                  }}
                >
                  {key}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#e0f2f1",
  },
  contentContainer: {
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#004d40",
  },
  calculator: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "darkslategray",
  },
  display: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "3px 15px 3px 15px",
    fontSize: "50px",
    textAlign: "right",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "LawnGreen",
    boxSizing: "border-box",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "dsdigii",
    color: "#000000",
  },
  buttonList: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  button: (key) => {
    let backgroundColor = "#f0f0f0";
    let color = "#000000";

    if (["AC", "DEL"].includes(key)) {
      backgroundColor = "#4caf50";
      color = "#ffffff"; //
    } else if (key === "=") {
      backgroundColor = "#2196f3";
      color = "#ffffff";
    }

    return {
      backgroundColor,
      color,
      borderRadius: "8px",
      textTransform: "none",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    };
  },
};

export default SimpleCalculatorComponent;
