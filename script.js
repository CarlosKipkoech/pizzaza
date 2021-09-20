// A $( document ).ready() block.
$(document).ready(function () {
  //$("#order-sectionn").hide();
  $("#the-cart").hide();
  $(".overlay").hide();
  $(".badge").hide();

  $(".carted").hide();
  $(".missing").hide();
  $("#order button").click(function () {});

  $(".overlay").click(function () {
    $(".overlay").hide();
    $("#the-cart").hide();
  });
  $(".d-btn").click(function () {
    $("#the-cart").hide();
  });

  $(".times").click(function () {
    console.log("hello");
    $(".overlay").hide();
    $("#the-cart").hide();
  });
  $(".carda").click(function () {
    $("#order-sectionn").show();
    $(".overlay").show();
  });
  $(".cart-btn button").click(function () {
    const selector = $("#inputGroupSelect01").find(":selected").text();
    const selector2 = $("#inputGroupSelect02").find(":selected").text();
    console.log(selector2);
    if (selector === "Choose..." || selector2 == "Choose...") {
      $(".missing").show();
      $(".missing").text("Please choose preffered size");
    } else {
      $("#selection").hide();
      $(".overlay").hide();
      $(".carted").show().delay(300);
    }
  });
  let carda = $(".carda").length;

  for (let i = 0; i < carda; i++) {
    $(".carda").click(function () {
      return carda + 1;
      console.log(carda);
    });
  }
  /*CART CLICKED*/
  $(".fa-cart-plus").click(function () {
    $("#the-cart").show();
    $(".overlay").show();
  });
  const pizzas = [
    { name: "Baked Ziti" },
    { name: "Chicago pizza" },
    { name: "French bread" },
    { name: "Grandma slice" },
  ];

  //Pizza Sizes
  const pizzaSizes = [
    {
      size: "Small",
      price: 600,
    },
    {
      size: "Medium",
      price: 800,
    },
    {
      size: "Large",
      price: 1000,
    },
  ];

  //Pizza Crusts
  const pizzaCrusts = [
    {
      name: "Crispy",
      price: 200,
    },
    {
      name: "Stuffed",
      price: 250,
    },
    {
      name: "Glutten Free",
      price: 150,
    },
  ];

  //Toppings
  const pizzaToppings = ["pepperoni", "Mushroom", "Black"];

  //Pizza Constructor
  function Pizza(name) {
    this.name = name;
    this.price = 0;
    this.quantity = 1; //This is the minimum quantity
    this.toppings = [];
  }

  //Pizza Size Prototype
  Pizza.prototype.setSize = function (size) {
    const pizzaSize = pizzaSizes.find((pizzaSize) => pizzaSize.size == size);
    if (pizzaSize) {
      this.size = pizzaSize;
      this.calculateTotal();
    }
  };

  //Pizza Crust Prototype
  Pizza.prototype.setCrust = function (name) {
    const pizzaCrust = pizzaCrusts.find(
      (pizzaCrust) => pizzaCrust.name == name
    );
    if (pizzaCrust) {
      this.crust = pizzaCrust;
      this.calculateTotal();
    }
  };

  //Pizza Toppings Prototype
  Pizza.prototype.setTopings = function (toppings) {
    this.toppings = toppings;
    this.calculateTotal();
  };

  //Pizza Quantity Prototype
  Pizza.prototype.setQuantity = function (quantity) {
    this.quantity = +quantity;
    this.calculateTotal();
  };

  // Pizza Prototype Total
  Pizza.prototype.calculateTotal = function () {
    const toppingPrice = 100;

    if (this.size) {
      this.price = this.size.price;
    }

    if (this.crust) {
      this.price = this.price + this.crust.price;
    }

    // Add Topping Price
    this.price += this.toppings.length * toppingPrice;

    this.price *= this.quantity;
  };

  //Appending Function
  $(function () {
    //pizza names
    pizzas.forEach((pizza) => {
      $("#pizza").append(
        `<option value="${pizza.name}">${pizza.name}</option>`
      );
    });
    //pizza sizes
    pizzaSizes.forEach((pizzaSize) => {
      $("#size").append(
        `<option value="${pizzaSize.size}">${pizzaSize.size}-${pizzaSize.price}</option>`
      );
    });

    //pizza crusts
    pizzaCrusts.forEach((pizzaCrust) => {
      $("#crust").append(
        `<option value="${pizzaCrust.name}">${pizzaCrust.name}-${pizzaCrust.price}</option>`
      );
    });

    //pizza toppings
    pizzaToppings.forEach((topping) => {
      $(".toppings").append(`<div class="col-md-6">
          <div class="form-check">
            <input class="form-check-input" name="toppings[]" type="checkbox" id="${topping}" value="${topping}">
            <label class="form-check-label" for="${topping}">
                ${topping}
            </label>
            </div>
          </div>`);
    });

    //Calculating Grand Total
    function calculateGrandTotal() {
      let total = 0;
      cart.forEach((pizza) => {
        total += pizza.price;
      });

      $(".grand-total").html(`Ksh <span class="text-bold">${total}</span> `);
    }

    //Cart Array
    const cart = [];
    //Check if cart is empty
    if (cart.length == 0) {
      $(".empty-cart").show();
      $(".delivery-button").hide();
    } else {
      $(".empty-cart").hide();
    }
    $("#order-form").on("submit", function (event) {
      //Prevent Default Action
      event.preventDefault();

      //Get Selected Values
      const selectedPizzaName = $("#pizza").val();
      const selectedSize = $("#size").val();
      const selectedCrust = $("#crust").val();
      const selectedToppings = $("input[name='toppings[]']:checkbox:checked")
        .map(function () {
          return $(this).val();
        })
        .get();

      //Field Validation
      if (!selectedPizzaName || !selectedSize || !selectedCrust) {
        $("#error").text("*Flavor, size and crust fields required* ");
        return;
      } else {
        $(".carted").fadeIn(1500, function () {
          $(".carted").delay(1000).fadeOut(1000);
          $(".badge").show();
        });
      }

      //Cart Details
      //Check if selected pizza exists in cart
      const cartPizza = cart.find((pizza) => {
        const sameToppings =
          JSON.stringify(pizza.toppings) == JSON.stringify(selectedToppings);

        return (
          pizza.name == selectedPizzaName &&
          pizza.size.size == selectedSize &&
          sameToppings
        );
      });
      //Increase Quantity if Exists
      if (cartPizza) {
        cartPizza.setQuantity(cartPizza.quantity + 1);
      } else {
        const pizza = new Pizza(selectedPizzaName);
        pizza.setSize(selectedSize);
        pizza.setCrust(selectedCrust);
        pizza.setTopings(selectedToppings);

        cart.push(pizza);
      }

      //Empty table body
      $(".order-table tbody").html("");
      //loop and append
      cart.forEach((pizza, cartIndex) => {
        $(".order-table tbody").append(`
              <tr>
                  <td >${pizza.name}</td>
                  <td >${pizza.size.size}</td>
                  <td >${pizza.crust.name}</td>
                  <td>${pizza.toppings.join(", ")}</td>
                  <td>
                      <input type="number" min="1" class="input-sm form-control pizza-quantity" data-cart-index="${cartIndex}" value="${
          pizza.quantity
        }" />
                  </td>
                  <td>Ksh ${pizza.price}</td>
              </tr>
          `);
        //Show proceed button
        $(".delivery-button").show();
        // console.log(pizza);
        //update grand total
        calculateGrandTotal();
      });
    });

    //Pizza Quantity Change
    $("body").on("change", ".pizza-quantity", function () {
      const quantity = $(this).val();
      const cartIndex = $(this).data("cart-index");
      const pizza = cart[cartIndex];

      if (quantity > 0) {
        pizza.setQuantity(quantity);
        // update line total
        $(this)
          .parent()
          .next()
          .html(`Ksh <span class="text-bold">${pizza.price}</span> `);
      }

      //update grand total
      calculateGrandTotal();
    });

    //Delivery Modal
    $("#delivery-form").on("submit", function (event) {
      //prevent default action
      event.preventDefault();

      //Radio Button Selection Validation
      const selectd = $("input[name='deliveryMethod']:checked");
      if (selectd.val() == undefined) {
        $(".delivery-option").html(
          "<p class='text-danger'>*Delivery method required*</p>"
        );
        return;
      } else {
        $(".delivery-option").text("");
        //Check Selected Radio Button
        if (selectd.val() == "delivery") {
          $("#location-input-details").show();

          //Constant User Input Variables
          const customerName = $("#customerName").val();
          const customerPhone = $("#customerPhone").val();
          const customerLocation = $("#customerLocation").val();
          const additionalInfo = $("#additionalInfo").val();

          //User Input Validation
          if (!customerName || !customerPhone || !customerLocation) {
            $(".error-delivery-location").text(
              "Fill in all input fields with * to proceed!"
            );
            return;
          } else {
            $(".error-delivery-location").text("");
          }
          function calculateGrandTotal() {
            let total = 0;
            cart.forEach((pizza) => {
              total += pizza.price;
            });
            const getTotalPlusDeliveryFee = total + 200;
            console.log(getTotalPlusDeliveryFee);
            console.log(cart);
            $("#select-delivery-method").hide();
            $(".delivery-head").append(`
                      <div class="alert alert-success" role="alert">Hello ${customerName}. Order successfully processed. Your order will be delivered to your location(${customerLocation})</div>
                          <div class="d-flex justify-content-between">
                              <div>
                                  <h5>Order Summary</h5>
                              </div>
                              <div>
                                  <p class="color-palace float-right">Total Ksh <span class="text-bold">${getTotalPlusDeliveryFee}</span></p>
                              </div>
                          </div>
                      `);
            //loop and append
            cart.forEach((pizza, cartIndex) => {
              $(".delivery-bottom").append(`
                          <div>
                          <div class="row">
                              <div class="col-md-12">
                                  <ol class="list-group">
                                      <li class="list-group-item d-flex justify-content-between align-items-start">
                                          <div class="ms-2 me-auto">
                                              <div class="fw-bold">${
                                                pizza.name
                                              }(${pizza.size.size})</div>
                                              Crust - ${pizza.crust.name} <br>
                                              Toppings - ${pizza.toppings.join(
                                                ", "
                                              )}
                                          </div>
                                          <span class="badge bg-primary rounded-pill">${
                                            pizza.quantity
                                          }</span>
                                      </li>
                                  </ol>
                              </div>
                          </div>
                         </div>
                          `);
            });
          }
          calculateGrandTotal();
          // $("#deliveryMethodModal").hide();
        } else if (selectd.val() == "pickup") {
          function calculateGrandTotal() {
            let total = 0;
            cart.forEach((pizza) => {
              total += pizza.price;
            });
            const getTotalPlusDeliveryFee = total;
            console.log(getTotalPlusDeliveryFee);
            $("#select-delivery-method").hide();
            $(".delivery-head").append(`
                      <div class="alert alert-success" role="alert">Hello. Order successfully processed. Your order will be delivered to your pickup point</div>
                          <div class="d-flex justify-content-between">
                              <div>
                                  <h5>Order Summary</h5>
                              </div>
                              <div>
                                  <p class="color-palace float-right">Total Ksh <span class="text-bold">${getTotalPlusDeliveryFee}</span></p>
                              </div>
                          </div>
                      `);
            //loop and append
            cart.forEach((pizza, cartIndex) => {
              $(".delivery-bottom").append(`
                          <div>
                          <div class="row">
                              <div class="col-md-12">
                                  <ol class="list-group">
                                      <li class="list-group-item d-flex justify-content-between align-items-start">
                                          <div class="ms-2 me-auto">
                                              <div class="fw-bold">${
                                                pizza.name
                                              }(${pizza.size.size})</div>
                                              Crust - ${pizza.crust.name} <br>
                                              Toppings - ${pizza.toppings.join(
                                                ", "
                                              )}
                                          </div>
                                          <span class="badge bg-primary rounded-pill">${
                                            pizza.quantity
                                          }</span>
                                      </li>
                                  </ol>
                              </div>
                          </div>
                         </div>
                          `);
            });
          }
          calculateGrandTotal();
        }
      }
    });
  });
});
