import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import waiterStyles from "../styles/style";

const OrderPlacement = () => {
  return (
    <View style={waiterStyles.orderPlacement}>
      <View style={waiterStyles.orderSelectTableBox}>
        <TouchableOpacity style={waiterStyles.orderSelectTable}>
          <Text style={waiterStyles.orderSelectTableText}>Select Table</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={waiterStyles.orderMenuBox}>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text style={waiterStyles.orderMenuQtyActionText}>
                        &minus;
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text style={waiterStyles.orderMenuQtyActionText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
          <View style={waiterStyles.singleOrderMenuBox}>
            <View style={waiterStyles.orderMenuImgBox}>
              <Image
                style={waiterStyles.orderMenuImg}
                source={require(`../../../../assets/images/Admin/dummy.jpg`)}
              />
            </View>

            <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
              <View style={waiterStyles.orderMenuDesBox}>
                <View style={waiterStyles.orderMenuName}>
                  <Text style={waiterStyles.orderMenuNameText}>NAMe</Text>
                </View>
                <View style={waiterStyles.orderMenuPrice}>
                  <Text style={waiterStyles.orderMenuPriceText}>price</Text>
                </View>
                <View style={waiterStyles.orderMenuQty}>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={waiterStyles.orderMenuQtyTextBox}>
                    <Text style={waiterStyles.orderMenuQtyText}>1</Text>
                  </View>
                  <View style={waiterStyles.orderMenuQtyActionBox}>
                    <TouchableOpacity>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={waiterStyles.orderMenuActionBox}>
                <Text>delete</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={waiterStyles.orderCalculationsBox}>
        <View style={waiterStyles.orderLeftCircle}></View>
        <View style={waiterStyles.orderRightCircle}></View>
        <View style={waiterStyles.orderCharges}>
          <View style={waiterStyles.singleOrderCharge}>
            <View>
              <Text style={waiterStyles.orderChargesDesText}>charges</Text>
            </View>
            <View>
              <Text style={waiterStyles.orderChargesPriceText}>charges</Text>
            </View>
          </View>
          <View style={waiterStyles.singleOrderCharge}>
            <View>
              <Text style={waiterStyles.orderChargesDesText}>charges</Text>
            </View>
            <View>
              <Text style={waiterStyles.orderChargesPriceText}>charges</Text>
            </View>
          </View>
        </View>

        <View style={waiterStyles.orderTotal}>
          <View>
            <Text style={waiterStyles.orderTotalDesText}>Total</Text>
          </View>
          <View>
            <Text style={waiterStyles.orderTotalPriceText}>PKR 123</Text>
          </View>
        </View>
        <View style={waiterStyles.orderActionButtons}>
          <TouchableOpacity
            style={[waiterStyles.orderButtons, waiterStyles.orderPlaceButton]}
          >
            <Text style={waiterStyles.orderButtonsText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[waiterStyles.orderButtons, waiterStyles.orderCancelButton]}
          >
            <Text style={waiterStyles.orderButtonsText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[waiterStyles.orderButtons, waiterStyles.orderDraftButton]}
          >
            <Text style={waiterStyles.orderButtonsText}>Draft</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderPlacement;
