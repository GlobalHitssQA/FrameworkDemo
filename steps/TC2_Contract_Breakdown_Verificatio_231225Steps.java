package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ActicenterLoginPage;
import pages.ContractBreakdownPage;
import static org.junit.Assert.*;

public class ContractBreakdownSteps {
    private WebDriver driver;
    private ActicenterLoginPage loginPage;
    private ContractBreakdownPage breakdownPage;
    
    public ContractBreakdownSteps(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new ActicenterLoginPage(driver);
        this.breakdownPage = new ContractBreakdownPage(driver);
    }
    
    @Given("the user is authenticated in Acticenter with private banking advisor profile")
    public void userIsAuthenticatedWithAdvisorProfile() {
        loginPage.navigateToActicenter();
    }
    
    @Given("a Physical Person Casa de Bolsa contract is available")
    public void casaDeBolsaContractIsAvailable() {
        // Precondition verification
        assertTrue("Casa de Bolsa contract should be available", breakdownPage.isCasaDeBolsaContractAvailable());
    }
    
    @Given("Asset allocation services and microservices AGAS-21435 to AGAS-21806 are operational")
    public void servicesAreOperational() {
        // Precondition verification
        assertTrue("Services should be operational", breakdownPage.areServicesOperational());
    }
    
    @Given("integration with Lumina is working correctly")
    public void luminaIntegrationWorking() {
        // Precondition verification
        assertTrue("Lumina integration should be working", breakdownPage.isLuminaIntegrationWorking());
    }
    
    @Given("the advisor accesses Acticenter platform")
    public void advisorAccessesActicenter() {
        loginPage.loginAsPrivateBankingAdvisor();
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }
    
    @When("the advisor selects a Physical Person Casa de Bolsa contract using BP contract search function")
    public void advisorSelectsCasaDeBolsaContract() {
        breakdownPage.searchAndSelectCasaDeBolsaContract();
    }
    
    @Then("the Casa de Bolsa contract information loads correctly")
    public void contractInformationLoadsCorrectly() {
        assertTrue("Contract information should load", breakdownPage.isContractInformationLoaded());
    }
    
    @When("the advisor clicks on the total contract value component")
    public void advisorClicksTotalContractValue() {
        breakdownPage.clickTotalContractValue();
    }
    
    @Then("the pop-up with total valuation breakdown is displayed")
    public void popupWithBreakdownIsDisplayed() {
        assertTrue("Breakdown pop-up should be displayed", breakdownPage.isBreakdownPopupDisplayed());
    }
    
    @And("the \"Poder de compra MXN\" item shows the currentCash value from Casa de Bolsa contract")
    public void poderDeCompraMXNShowsCurrentCash() {
        assertTrue("Poder de compra MXN should show currentCash value", breakdownPage.verifyPoderDeCompraMXNValue());
    }
    
    @And("all applicable items are displayed: \"Poder de compra MXN\", \"Efectivo USD\", \"Pendientes por liquidar\", \"Fondos de deuda\", \"Fondos de cobertura\", \"Fondos de renta variable\", \"Cedes y pagarés\", \"Mercado de dinero\", \"Mercado de capitales\"")
    public void allApplicableItemsAreDisplayed() {
        String[] expectedItems = {
            "Poder de compra MXN",
            "Efectivo USD",
            "Pendientes por liquidar",
            "Fondos de deuda",
            "Fondos de cobertura",
            "Fondos de renta variable",
            "Cedes y pagarés",
            "Mercado de dinero",
            "Mercado de capitales"
        };
        assertTrue("All items should be displayed", breakdownPage.verifyAllItemsDisplayed(expectedItems));
    }
    
    @And("each item displays its corresponding monetary value on the right side")
    public void eachItemDisplaysMonetaryValue() {
        assertTrue("Each item should display monetary value", breakdownPage.verifyItemsHaveMonetaryValues());
    }
    
    @And("items without monetary value show \"$0.00\"")
    public void itemsWithoutValueShowZero() {
        assertTrue("Items without value should show $0.00", breakdownPage.verifyEmptyItemsShowZero());
    }
    
    @And("the \"Efectivo USD\" item shows the correct USD currency amount")
    public void efectivoUSDShowsCorrectAmount() {
        assertTrue("Efectivo USD should show correct amount", breakdownPage.verifyEfectivoUSDAmount());
    }
    
    @And("the Asset allocation service information is correctly displayed in the breakdown")
    public void assetAllocationInfoDisplayedCorrectly() {
        assertTrue("Asset allocation info should be displayed correctly", breakdownPage.verifyAssetAllocationData());
    }
    
    @When("the advisor clicks outside the pop-up component")
    public void advisorClicksOutsidePopup() {
        breakdownPage.clickOutsidePopup();
    }
    
    @Then("the pop-up closes properly")
    public void popupClosesProperly() {
        assertTrue("Pop-up should be closed", breakdownPage.isPopupClosed());
    }
}