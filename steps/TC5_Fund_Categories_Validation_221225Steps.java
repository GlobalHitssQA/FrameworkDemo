package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.FundCategoriesPage;
import static org.junit.Assert.*;

public class FundCategoriesSteps {
    private WebDriver driver;
    private FundCategoriesPage fundCategoriesPage;
    private String debtFundsValue;
    private String hedgeFundsValue;
    private String equityFundsValue;

    public FundCategoriesSteps(WebDriver driver) {
        this.driver = driver;
        this.fundCategoriesPage = new FundCategoriesPage(driver);
    }

    @Given("the Lumina services for funds are operational and returning correct data")
    public void luminaServicesAreOperational() {
        // Verify Lumina services connectivity
        assertTrue("Lumina services should be operational", fundCategoriesPage.verifyLuminaServices());
    }

    @Given("there are contracts with investments distributed across different fund types")
    public void contractsWithInvestmentsExist() {
        // Verify contracts availability
        assertTrue("Contracts should be available", fundCategoriesPage.verifyContractsAvailable());
    }

    @Given("I select a contract with investments in debt funds")
    public void selectContractWithDebtFunds() {
        fundCategoriesPage.selectContractWithDebtFunds();
    }

    @Given("I select a contract without investments in some fund types")
    public void selectContractWithoutInvestments() {
        fundCategoriesPage.selectContractWithoutInvestments();
    }

    @When("I expand the contract composition breakdown")
    public void expandCompositionBreakdown() {
        fundCategoriesPage.clickCompositionBreakdown();
    }

    @Then("the popup displays the breakdown with all applicable categories")
    public void verifyPopupDisplaysBreakdown() {
        assertTrue("Breakdown popup should be visible", fundCategoriesPage.isBreakdownPopupVisible());
        assertTrue("All fund categories should be present", fundCategoriesPage.areFundCategoriesPresent());
    }

    @And("the debt funds category is present and shows the corresponding monetary total")
    public void verifyDebtFundsCategory() {
        assertTrue("Debt funds category should be visible", fundCategoriesPage.isDebtFundsCategoryVisible());
        debtFundsValue = fundCategoriesPage.getDebtFundsValue();
        assertNotNull("Debt funds value should not be null", debtFundsValue);
        assertTrue("Debt funds value should be monetary format", debtFundsValue.matches("\\$[0-9,]+\\.[0-9]{2}"));
    }

    @And("the hedge funds category is present and shows the corresponding monetary total")
    public void verifyHedgeFundsCategory() {
        assertTrue("Hedge funds category should be visible", fundCategoriesPage.isHedgeFundsCategoryVisible());
        hedgeFundsValue = fundCategoriesPage.getHedgeFundsValue();
        assertNotNull("Hedge funds value should not be null", hedgeFundsValue);
        assertTrue("Hedge funds value should be monetary format", hedgeFundsValue.matches("\\$[0-9,]+\\.[0-9]{2}"));
    }

    @And("the equity funds category is present and shows the corresponding monetary total")
    public void verifyEquityFundsCategory() {
        assertTrue("Equity funds category should be visible", fundCategoriesPage.isEquityFundsCategoryVisible());
        equityFundsValue = fundCategoriesPage.getEquityFundsValue();
        assertNotNull("Equity funds value should not be null", equityFundsValue);
        assertTrue("Equity funds value should be monetary format", equityFundsValue.matches("\\$[0-9,]+\\.[0-9]{2}"));
    }

    @And("the displayed values match the data obtained from Lumina services")
    public void verifyValuesMatchLuminaData() {
        String luminaDebtValue = fundCategoriesPage.getLuminaDebtFundsValue();
        String luminaHedgeValue = fundCategoriesPage.getLuminaHedgeFundsValue();
        String luminaEquityValue = fundCategoriesPage.getLuminaEquityFundsValue();

        assertEquals("Debt funds value should match Lumina data", luminaDebtValue, debtFundsValue);
        assertEquals("Hedge funds value should match Lumina data", luminaHedgeValue, hedgeFundsValue);
        assertEquals("Equity funds value should match Lumina data", luminaEquityValue, equityFundsValue);
    }

    @Then("the fund categories without investments display $0.00")
    public void verifyEmptyFundCategoriesShowZero() {
        String debtValue = fundCategoriesPage.getDebtFundsValue();
        String hedgeValue = fundCategoriesPage.getHedgeFundsValue();
        String equityValue = fundCategoriesPage.getEquityFundsValue();

        boolean hasZeroValue = debtValue.equals("$0.00") || hedgeValue.equals("$0.00") || equityValue.equals("$0.00");
        assertTrue("At least one fund category should show $0.00", hasZeroValue);
    }
}