package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ActicenterLoginPage;
import pages.ContractSearchPage;
import pages.ContractValueBreakdownPage;
import static org.junit.Assert.*;

public class ContractValueBreakdownSteps {
    private WebDriver driver;
    private ActicenterLoginPage loginPage;
    private ContractSearchPage contractSearchPage;
    private ContractValueBreakdownPage breakdownPage;
    
    public ContractValueBreakdownSteps(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new ActicenterLoginPage(driver);
        this.contractSearchPage = new ContractSearchPage(driver);
        this.breakdownPage = new ContractValueBreakdownPage(driver);
    }
    
    @Given("the advisor user is authenticated in the Brokerage House system")
    public void theAdvisorUserIsAuthenticated() {
        assertTrue("User should have advisor permissions", loginPage.hasAdvisorPermissions());
    }
    
    @Given("the contract valuation services are operational")
    public void theContractValuationServicesAreOperational() {
        assertTrue("Valuation services should be operational", breakdownPage.verifyValuationServicesStatus());
    }
    
    @Given("the Advisor currentCash module is available")
    public void theAdvisorCurrentCashModuleIsAvailable() {
        assertTrue("CurrentCash module should be available", breakdownPage.verifyCurrentCashModuleStatus());
    }
    
    @Given("the funds, CDs, promissory notes and markets API are functioning correctly")
    public void theFundsAPIAreFunctioningCorrectly() {
        assertTrue("APIs should be functioning", breakdownPage.verifyAPIsStatus());
    }
    
    @Given("the advisor has accessed Acticenter system")
    public void theAdvisorHasAccessedActicenter() {
        loginPage.loginAsAdvisor();
        assertTrue("Should be logged in to Acticenter", loginPage.isLoggedIn());
    }
    
    @When("the advisor searches for a Legal Entity contract in the Brokerage House")
    public void theAdvisorSearchesForLegalEntityContract() {
        contractSearchPage.searchLegalEntityContract();
    }
    
    @When("the advisor selects the Legal Entity contract")
    public void theAdvisorSelectsTheLegalEntityContract() {
        contractSearchPage.selectFirstLegalEntityContract();
    }
    
    @Then("the total contract value component should be displayed")
    public void theTotalContractValueComponentShouldBeDisplayed() {
        assertTrue("Total contract value component should be visible", breakdownPage.isTotalValueComponentDisplayed());
    }
    
    @When("the advisor clicks on the total contract value component")
    public void theAdvisorClicksOnTotalContractValueComponent() {
        breakdownPage.clickTotalValueComponent();
    }
    
    @Then("a popup with the complete contract value breakdown should be displayed")
    public void aPopupWithCompleteBreakdownShouldBeDisplayed() {
        assertTrue("Breakdown popup should be displayed", breakdownPage.isBreakdownPopupDisplayed());
    }
    
    @And("the \"Poder de compra MXN\" item should display the currentCash value from Advisor Module aligned to the right")
    public void thePoderDeCompraMXNShouldDisplay() {
        assertTrue("Poder de compra MXN should be displayed", breakdownPage.isPoderDeCompraMXNDisplayed());
        assertTrue("Poder de compra MXN value should be aligned right", breakdownPage.isPoderDeCompraMXNAlignedRight());
        assertNotNull("Poder de compra MXN should have a value", breakdownPage.getPoderDeCompraMXNValue());
    }
    
    @And("the \"Efectivo USD\" item should display the USD cash amount aligned to the right")
    public void theEfectivoUSDShouldDisplay() {
        assertTrue("Efectivo USD should be displayed", breakdownPage.isEfectivoUSDDisplayed());
        assertTrue("Efectivo USD value should be aligned right", breakdownPage.isEfectivoUSDAlignedRight());
        assertNotNull("Efectivo USD should have a value", breakdownPage.getEfectivoUSDValue());
    }
    
    @And("the \"Pendientes por liquidar\" item should display the accumulated pending settlements amount")
    public void thePendientesPorLiquidarShouldDisplay() {
        assertTrue("Pendientes por liquidar should be displayed", breakdownPage.isPendientesPorLiquidarDisplayed());
        assertNotNull("Pendientes por liquidar should have a value", breakdownPage.getPendientesPorLiquidarValue());
    }
    
    @And("the \"Fondos de deuda\" item should display the debt funds accumulated value")
    public void theFondosDeDeudaShouldDisplay() {
        assertTrue("Fondos de deuda should be displayed", breakdownPage.isFondosDeDeudaDisplayed());
        assertNotNull("Fondos de deuda should have a value", breakdownPage.getFondosDeDeudaValue());
    }
    
    @And("the \"Fondos de cobertura\" item should display the hedge funds accumulated value")
    public void theFondosDeCoberturaShouldDisplay() {
        assertTrue("Fondos de cobertura should be displayed", breakdownPage.isFondosDeCoberturaDisplayed());
        assertNotNull("Fondos de cobertura should have a value", breakdownPage.getFondosDeCoberturaValue());
    }
    
    @And("the \"Fondos de renta variable\" item should display the equity funds accumulated value")
    public void theFondosDeRentaVariableShouldDisplay() {
        assertTrue("Fondos de renta variable should be displayed", breakdownPage.isFondosDeRentaVariableDisplayed());
        assertNotNull("Fondos de renta variable should have a value", breakdownPage.getFondosDeRentaVariableValue());
    }
    
    @And("the \"Cedes y pagarés\" item should display the CDs and promissory notes accumulated value")
    public void theCedesYPagaresShouldDisplay() {
        assertTrue("Cedes y pagarés should be displayed", breakdownPage.isCedesYPagaresDisplayed());
        assertNotNull("Cedes y pagarés should have a value", breakdownPage.getCedesYPagaresValue());
    }
    
    @And("the \"Mercado de dinero\" item should display the money market accumulated value")
    public void theMercadoDeDineroShouldDisplay() {
        assertTrue("Mercado de dinero should be displayed", breakdownPage.isMercadoDeDineroDisplayed());
        assertNotNull("Mercado de dinero should have a value", breakdownPage.getMercadoDeDineroValue());
    }
    
    @And("the \"Mercado de capitales\" item should display the capital market accumulated value")
    public void theMercadoDeCapitalesShouldDisplay() {
        assertTrue("Mercado de capitales should be displayed", breakdownPage.isMercadoDeCapitalesDisplayed());
        assertNotNull("Mercado de capitales should have a value", breakdownPage.getMercadoDeCapitalesValue());
    }
    
    @And("all items without value should display \"$0.00\"")
    public void allItemsWithoutValueShouldDisplayZero() {
        assertTrue("Items without value should show $0.00", breakdownPage.verifyZeroValuesDisplayedCorrectly());
    }
    
    @And("the breakdown list should be vertically aligned with the total value component")
    public void theBreakdownListShouldBeVerticallyAligned() {
        assertTrue("Breakdown list should be vertically aligned", breakdownPage.isBreakdownListVerticallyAligned());
    }
}